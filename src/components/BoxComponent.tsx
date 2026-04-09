import { Box } from "@mantine/core";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const BoxComponent = ({ children }: Props) => {
  return (
    <Box bg="gray.2" className="flex flex-col gap-6 rounded-lg p-6">
      {children}
    </Box>
  );
};
