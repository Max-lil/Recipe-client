import { Box, useMantineTheme } from "@mantine/core";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const BoxComponent = ({ children }: Props) => {
  const theme = useMantineTheme();

  return (
    <Box bg={theme.other.surfaceLow} className="flex flex-col gap-6 rounded-2xl p-6">
      {children}
    </Box>
  );
};
