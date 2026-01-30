import { MiniCalendar } from "@mantine/dates";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useState } from "react";
import { DayPlanning } from "../components/DayPlanning";
import { Button, Title } from "@mantine/core";

export const Route = createFileRoute("/weeklyplanning")({
  component: RouteComponent,
});

function RouteComponent() {
  const [value, onChange] = useState<string | null>();

  return (
    <div className="flex flex-col gap-3 p-3">
      <Title order={1} fw={700}>
        Veckoplanering
      </Title>
      <MiniCalendar
        locale="se"
        value={value}
        onChange={onChange}
        numberOfDays={7}
        getDayProps={(date) => ({
          style: {
            color: [0, 6].includes(dayjs(date).day())
              ? "var(--mantine-color-red-8)"
              : undefined,
          },
        })}
      />
      {value && <DayPlanning date={new Date(value).toDateString()} />}
      <Button>Slumpa recept</Button>
      <Button>Spara recept</Button>
    </div>
  );
}
