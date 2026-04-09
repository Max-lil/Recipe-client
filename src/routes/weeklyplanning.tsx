import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Alert, Button, Group, Loader, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import "dayjs/locale/sv";
import isoWeek from "dayjs/plugin/isoWeek";
import { DayPlanning } from "../components/DayPlanning";
import { WeekInputMinimal } from "../components/WeekPicker";
import type { ApiRecipeschema } from "../models/Recipe";
import type {
  PlanningDraft,
  SaveWeekPlanRequest,
  WeekPlan,
} from "../models/Planning";
import {
  useSaveWeekPlanMutation,
  weekPlanQueryOptions,
} from "../services/planning/queries";
import { useRecipesQuery } from "../services/recipes/queries";

export const Route = createFileRoute("/weeklyplanning")({
  component: RouteComponent,
});

dayjs.extend(isoWeek);
dayjs.locale("sv");

const USER_ID = 1;

type SaveStatus = "idle" | "saving" | "saved" | "error";
type RecipeEdits = Partial<Record<string, ApiRecipeschema | null>>;

const createEmptyDraft = (weekStartDate: string): PlanningDraft => ({
  weekStartDate,
  days: Array.from({ length: 7 }, (_, index) => ({
    plannedDate: dayjs(weekStartDate).add(index, "day").format("YYYY-MM-DD"),
    recipe: null,
  })),
});

const mapWeekPlanToDraft = (week: WeekPlan): PlanningDraft => ({
  weekPlanId: week.id,
  weekStartDate: week.weekStartDate,
  days: [...week.days]
    .sort((left, right) => left.plannedDate.localeCompare(right.plannedDate))
    .map((day) => ({
      id: day.id,
      plannedDate: day.plannedDate,
      recipe: day.recipe,
    })),
});

const buildSavePayload = (
  draft: PlanningDraft,
  userId: number,
): SaveWeekPlanRequest => ({
  userId,
  weekStartDate: draft.weekStartDate,
  days: draft.days.map((day) => ({
    plannedDate: day.plannedDate,
    recipeId: day.recipe?.id ?? null,
  })),
});

const mergeDraftWithRecipeEdits = (
  draft: PlanningDraft,
  recipeEdits: RecipeEdits,
): PlanningDraft => ({
  ...draft,
  days: draft.days.map((day) =>
    Object.prototype.hasOwnProperty.call(recipeEdits, day.plannedDate)
      ? { ...day, recipe: recipeEdits[day.plannedDate] ?? null }
      : day,
  ),
});

function RouteComponent() {
  const [value, setValue] = useState<string | null>(null);
  const [recipeEdits, setRecipeEdits] = useState<RecipeEdits>({});
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const weekStartDate = useMemo(
    () => (value ? dayjs(value).startOf("isoWeek").format("YYYY-MM-DD") : null),
    [value],
  );

  const weekPlanQuery = useQuery(
    weekPlanQueryOptions(USER_ID, weekStartDate ?? undefined),
  );
  const { data: recipes } = useQuery(useRecipesQuery());
  const saveWeekMutation = useSaveWeekPlanMutation();

  const baseDraft = useMemo(() => {
    if (!weekStartDate || !weekPlanQuery.isSuccess) {
      return null;
    }

    return weekPlanQuery.data
      ? mapWeekPlanToDraft(weekPlanQuery.data)
      : createEmptyDraft(weekStartDate);
  }, [weekPlanQuery.data, weekPlanQuery.isSuccess, weekStartDate]);

  const draft = useMemo(() => {
    if (!baseDraft) {
      return null;
    }

    return mergeDraftWithRecipeEdits(baseDraft, recipeEdits);
  }, [baseDraft, recipeEdits]);

  const isDirty = Object.keys(recipeEdits).length > 0;

  const handleWeekChange = (nextValue: string | null) => {
    setValue(nextValue);
    setRecipeEdits({});
    setSaveStatus("idle");
  };

  const handleSelectRecipe = (
    dayKey: string,
    recipe: ApiRecipeschema | null,
  ) => {
    setRecipeEdits((prev) => {
      if (!baseDraft) {
        return prev;
      }

      const baseRecipeId =
        baseDraft.days.find((day) => day.plannedDate === dayKey)?.recipe?.id ??
        null;
      const nextRecipeId = recipe?.id ?? null;

      if (baseRecipeId === nextRecipeId) {
        const remainingEdits = { ...prev };
        delete remainingEdits[dayKey];
        return remainingEdits;
      }

      return { ...prev, [dayKey]: recipe };
    });
    setSaveStatus("idle");
  };

  const handleRandomizeRecipes = () => {
    if (!baseDraft || !recipes?.length) {
      return;
    }

    setRecipeEdits(() =>
      baseDraft.days.reduce<RecipeEdits>((nextEdits, day) => {
        const recipe = recipes[Math.floor(Math.random() * recipes.length)];

        if (day.recipe?.id !== recipe.id) {
          nextEdits[day.plannedDate] = recipe;
        }

        return nextEdits;
      }, {}),
    );
    setSaveStatus("idle");
  };

  const handleSaveWeek = async () => {
    if (!draft) {
      return;
    }

    setSaveStatus("saving");

    try {
      await saveWeekMutation.mutateAsync(buildSavePayload(draft, USER_ID));
      setRecipeEdits({});
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3">
      <Title order={1} fw={700}>
        Veckoplanering
      </Title>

      <WeekInputMinimal onChange={handleWeekChange} />

      {weekStartDate && weekPlanQuery.isPending ? (
        <Loader color="orange.5" size="xl" />
      ) : null}

      {weekStartDate && weekPlanQuery.isError ? (
        <Alert color="red" title="Kunde inte hamta veckoplaneringen">
          {weekPlanQuery.error instanceof Error
            ? weekPlanQuery.error.message
            : "Ett ovantat fel uppstod."}
        </Alert>
      ) : null}

      {draft?.days.map((day) => (
        <DayPlanning
          key={day.plannedDate}
          dayKey={day.plannedDate}
          date={`${dayjs(day.plannedDate).format("dddd")} ${day.plannedDate}`}
          onSelectRecipe={handleSelectRecipe}
          selectedRecipe={day.recipe}
        />
      ))}

      {draft ? (
        <Group>
          <Button
            disabled={!recipes?.length}
            onClick={handleRandomizeRecipes}
            variant="light"
          >
            Slumpa recept
          </Button>
          <Button
            disabled={!isDirty || saveStatus === "saving"}
            loading={saveStatus === "saving"}
            onClick={handleSaveWeek}
          >
            Spara recept
          </Button>
        </Group>
      ) : null}

      {draft ? (
        <Text c={saveStatus === "error" ? "red" : "dimmed"} size="sm">
          {saveStatus === "idle" && isDirty
            ? "Du har osparade andringar."
            : null}
          {saveStatus === "idle" && !isDirty
            ? "Valj recept for veckan och spara nar du ar klar."
            : null}
          {saveStatus === "saved" ? "Veckoplaneringen ar sparad." : null}
          {saveStatus === "error"
            ? "Det gick inte att spara veckoplaneringen."
            : null}
        </Text>
      ) : null}
    </div>
  );
}
