import type { Icon } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { Card, Stack, Text, ThemeIcon, useMantineTheme } from "@mantine/core";

interface Props {
  icon: Icon;
  header: string;
  body?: string;
  to: string;
  accent: "primary" | "secondary" | "tertiary";
}

export const CardComponent = ({
  icon: IconComponent,
  header,
  body,
  to,
  accent,
}: Props) => {
  const theme = useMantineTheme();

  const accentColors = {
    primary: { bg: theme.other.primaryContainer, fg: theme.other.onPrimaryContainer },
    secondary: { bg: theme.other.secondaryContainer, fg: theme.other.onSecondaryContainer },
    tertiary: { bg: theme.other.tertiaryContainer, fg: theme.other.onTertiaryContainer },
  };
  const badge = accentColors[accent];

  return (
    <Card
      component={Link}
      to={to}
      radius="xl"
      shadow="sm"
      p="xl"
      bg={theme.other.surfaceLowest}
      className="group transition-all duration-300 hover:-translate-y-1"
    >
      <Stack gap="xl">
        <ThemeIcon
          size={72}
          radius="xl"
          style={{ backgroundColor: badge.bg, color: badge.fg }}
          className="transition-transform duration-300 group-hover:scale-110"
        >
          <IconComponent size={32} />
        </ThemeIcon>

        <Stack gap={4}>
          <Text size="xl" fw={600} c={theme.other.textPrimary}>
            {header}
          </Text>

          {body ? (
            <Text size="sm" c={theme.other.textSecondary}>
              {body}
            </Text>
          ) : null}
        </Stack>
      </Stack>
    </Card>
  );
};
