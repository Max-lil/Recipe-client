import { useMantineTheme } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

interface Props {
  onChange: (value: string | null) => void;
}

export function WeekInputMinimal({ onChange }: Props) {
  const theme = useMantineTheme();
  const [value, setValue] = useState<string | null>(null);

  const handleChange = (nextValue: string | null) => {
    setValue(nextValue);
    onChange(nextValue);
  };

  return (
    <DatePickerInput
      type="default"
      size="md"
      leftSection={<IconCalendar size={18} stroke={1.5} />}
      leftSectionPointerEvents="none"
      popoverProps={{
        styles: { dropdown: { backgroundColor: theme.other.surfaceLowest } },
      }}
      label="Vecka"
      placeholder="Välj en vecka"
      value={value}
      onChange={handleChange}
      firstDayOfWeek={1}
      withWeekNumbers
      clearable
      valueFormatter={({ date }) => {
        if (!date || Array.isArray(date)) {
          return "";
        }

        const selectedDate = dayjs(date);
        return `Vecka ${selectedDate.isoWeek()} ${selectedDate.isoWeekYear()}`;
      }}
    />
  );
}
