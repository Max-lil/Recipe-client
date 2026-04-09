import type { Icon } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { Card, Stack, Text, ThemeIcon, useMantineTheme } from "@mantine/core";

interface Props {
  icon: Icon;
  header: string;
  body?: string;
  to: string;
}

export const CardComponent = ({
  icon: IconComponent,
  header,
  body,
  to,
}: Props) => {
  const theme = useMantineTheme();

  return (
    <Card
      component={Link}
      padding="md"
      radius="xl"
      shadow="md"
      to={to}
      bg={theme.colors.secondary[2]}
    >
      <Stack gap="xs">
        <ThemeIcon variant="default" size="xl" radius="md">
          <IconComponent size={20} />
        </ThemeIcon>

        <Stack gap={2}>
          <Text size="xl" fw={800}>
            {header}
          </Text>

          {body ? <Text size="sm">{body}</Text> : null}
        </Stack>
      </Stack>
    </Card>
  );
};
