import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

export function WeekInputMinimal({
  onChange,
}: {
  onChange: (value: string | null) => void;
}) {
  const [value, setValue] = useState<string | null>(null);

  const handleChange = (newValue: string | null) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <DatePickerInput
      type="default"
      label="Week"
      placeholder="Pick a week"
      value={value}
      onChange={handleChange}
      firstDayOfWeek={1}
      withWeekNumbers
      clearable
      valueFormatter={({ date }) => {
        if (!date || Array.isArray(date)) return "";
        const d = dayjs(date);
        return `Week ${d.isoWeek()} ${d.isoWeekYear()}`;
      }}
    />
  );
}
