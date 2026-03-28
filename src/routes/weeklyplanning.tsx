import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DayPlanning } from "../components/DayPlanning";
import { Button, Title } from "@mantine/core";
import { WeekInputMinimal } from "../components/WeekPicker";

export const Route = createFileRoute("/weeklyplanning")({
  component: RouteComponent,
});

function RouteComponent() {
  const [value, setValue] = useState<string | null>();

  return (
    <div className="flex flex-col gap-3 p-3">
      <Title order={1} fw={700}>
        Veckoplanering
      </Title>
      <WeekInputMinimal onChange={setValue} />
      {value && <DayPlanning date={new Date(value).toDateString()} />}
      <Button>Slumpa recept</Button>
      <Button>Spara recept</Button>
    </div>
  );
}
