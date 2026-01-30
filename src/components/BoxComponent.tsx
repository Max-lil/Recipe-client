import { Box } from "@mantine/core";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export function BoxComponent({ children }: Props) {
  return (
    <Box bg="gray.2" className="rounded-lg p-6 flex flex-col gap-6">
      {children}
    </Box>
  );
}
