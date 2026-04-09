import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Alert, Loader, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { BoxComponent } from "../components/BoxComponent";
import { ShoppingListComponent } from "../components/ShoppingListComponent";
import { WeekInputMinimal } from "../components/WeekPicker";
import { weekPlanQueryOptions } from "../services/planning/queries";

export const Route = createFileRoute("/shoppinglist")({
  component: RouteComponent,
});

dayjs.extend(isoWeek);

const USER_ID = 1;

function RouteComponent() {
  const [value, setValue] = useState<string | null>(null);
  const weekStartDate = value
    ? dayjs(value).startOf("isoWeek").format("YYYY-MM-DD")
    : null;

  const weekPlanQuery = useQuery(
    weekPlanQueryOptions(USER_ID, weekStartDate ?? undefined),
  );

  return (
    <Stack gap="md">
      <Title order={1} fw={700}>
        Inköpslista
      </Title>

      <WeekInputMinimal onChange={setValue} />

      <BoxComponent>
        {!weekStartDate ? (
          <Text>Välj en vecka för att se inköpslistan.</Text>
        ) : null}

        {weekStartDate && weekPlanQuery.isPending ? (
          <Loader color="orange.5" size="xl" />
        ) : null}

        {weekStartDate && weekPlanQuery.isError ? (
          <Alert color="red" title="Kunde inte hämta veckoplaneringen">
            {weekPlanQuery.error instanceof Error
              ? weekPlanQuery.error.message
              : "Ett oväntat fel uppstod."}
          </Alert>
        ) : null}

        {weekStartDate &&
        weekPlanQuery.isSuccess &&
        weekPlanQuery.data === null ? (
          <Text>Ingen sparad veckoplan för vald vecka.</Text>
        ) : null}

        {weekPlanQuery.data ? (
          <ShoppingListComponent weekPlanId={weekPlanQuery.data.id} />
        ) : null}
      </BoxComponent>
    </Stack>
  );
}
