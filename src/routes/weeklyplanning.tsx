import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  Alert,
  Button,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowsShuffle, IconDeviceFloppy } from "@tabler/icons-react";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/sv";
import isoWeek from "dayjs/plugin/isoWeek";
import { DayPlanning } from "../components/DayPlanning";
import { WeekInputMinimal } from "../components/WeekPicker";
import type {
  PlanningDraft,
  SaveWeekPlanRequest,
  WeekPlan,
} from "../models/Planning";
import type { Recipe } from "../models/Recipe";
import {
  useSaveWeekPlanMutation,
  weekPlanQueryOptions,
} from "../services/planning/queries";
import { recipesQueryOptions } from "../services/recipes/queries";

export const Route = createFileRoute("/weeklyplanning")({
  component: RouteComponent,
});

dayjs.extend(isoWeek);
dayjs.locale("sv");

const USER_ID = 1;

type SaveStatus = "idle" | "saving" | "saved" | "error";
type RecipeEdits = Partial<Record<string, Recipe | null>>;

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

  const weekStartDate = value
    ? dayjs(value).startOf("isoWeek").format("YYYY-MM-DD")
    : null;

  const weekPlanQuery = useQuery(
    weekPlanQueryOptions(USER_ID, weekStartDate ?? undefined),
  );
  const recipesQuery = useQuery(recipesQueryOptions());
  const saveWeekMutation = useSaveWeekPlanMutation();

  let baseDraft: PlanningDraft | null = null;

  if (weekStartDate && weekPlanQuery.isSuccess) {
    baseDraft = mapWeekPlanToDraft(weekPlanQuery.data);
  }

  const draft = baseDraft
    ? mergeDraftWithRecipeEdits(baseDraft, recipeEdits)
    : null;
  const isDirty = Object.keys(recipeEdits).length > 0;

  const handleWeekChange = (nextValue: string | null) => {
    setValue(nextValue);
    setRecipeEdits({});
    setSaveStatus("idle");
  };

  const handleSelectRecipe = (dayKey: string, recipe: Recipe | null) => {
    setRecipeEdits((previousEdits) => {
      if (!baseDraft) {
        return previousEdits;
      }

      const baseRecipeId =
        baseDraft.days.find((day) => day.plannedDate === dayKey)?.recipe?.id ??
        null;
      const nextRecipeId = recipe?.id ?? null;

      if (baseRecipeId === nextRecipeId) {
        const nextEdits = { ...previousEdits };
        delete nextEdits[dayKey];
        return nextEdits;
      }

      return { ...previousEdits, [dayKey]: recipe };
    });

    setSaveStatus("idle");
  };

  const handleRandomizeRecipes = () => {
    if (!baseDraft || !recipesQuery.data?.length) {
      return;
    }

    setRecipeEdits(() =>
      baseDraft.days.reduce<RecipeEdits>((nextEdits, day) => {
        const randomIndex = Math.floor(
          Math.random() * recipesQuery.data.length,
        );
        const recipe = recipesQuery.data[randomIndex];

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
    <Stack gap="md">
      <Title order={1} fw={700}>
        Veckoplanering
      </Title>

      <WeekInputMinimal onChange={handleWeekChange} />

      {weekStartDate && weekPlanQuery.isPending ? (
        <Loader color="secondary.5" size="xl" />
      ) : null}

      {weekStartDate && weekPlanQuery.isError ? (
        <Alert color="danger" title="Kunde inte hämta veckoplaneringen">
          {weekPlanQuery.error instanceof Error
            ? weekPlanQuery.error.message
            : "Ett oväntat fel uppstod."}
        </Alert>
      ) : null}

      {draft?.days.map((day) => (
        <DayPlanning
          key={day.plannedDate}
          dayKey={day.plannedDate}
          date={`${dayjs(day.plannedDate).format("dddd")} ${day.plannedDate}`}
          recipes={recipesQuery.data}
          isRecipesLoading={recipesQuery.isPending}
          onSelectRecipe={handleSelectRecipe}
          selectedRecipe={day.recipe}
        />
      ))}

      {draft ? (
        <Group>
          <Button
            disabled={!recipesQuery.data?.length}
            onClick={handleRandomizeRecipes}
            variant="light"
            leftSection={<IconArrowsShuffle size={16} />}
          >
            Slumpa recept
          </Button>
          <Button
            disabled={!isDirty || saveStatus === "saving"}
            loading={saveStatus === "saving"}
            onClick={handleSaveWeek}
            leftSection={<IconDeviceFloppy size={16} />}
          >
            Spara recept
          </Button>
        </Group>
      ) : null}

      {draft ? (
        <Text c={saveStatus === "error" ? "danger" : "dimmed"} size="sm">
          {saveStatus === "idle" && isDirty
            ? "Du har osparade ändringar."
            : null}
          {saveStatus === "idle" && !isDirty
            ? "Välj recept för veckan och spara när du är klar."
            : null}
          {saveStatus === "saved" ? "Veckoplaneringen är sparad." : null}
          {saveStatus === "error"
            ? "Det gick inte att spara veckoplaneringen."
            : null}
        </Text>
      ) : null}
    </Stack>
  );
}
