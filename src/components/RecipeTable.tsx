import {
  Button,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import type { Recipe } from "../models/Recipe";

interface Props {
  data?: Recipe[];
}

export const RecipeTable = ({ data }: Props) => {
  const theme = useMantineTheme();

  return (
    <Stack gap="sm">
      {data?.map((recipe) => (
        <Paper
          key={recipe.id}
          p="md"
          radius="xl"
          shadow="sm"
          bg={theme.other.surfaceLowest}
        >
          <Group justify="space-between" wrap="nowrap">
            <Text fw={600} c={theme.other.textPrimary}>
              {recipe.title}
            </Text>

            {recipe.url ? (
              <Button
                component="a"
                href={recipe.url}
                target="_blank"
                size="sm"
                leftSection={<IconExternalLink size={14} />}
                style={{
                  backgroundColor: theme.other.tertiaryContainer,
                  color: theme.other.onTertiaryContainer,
                }}
              >
                Till recept
              </Button>
            ) : null}
          </Group>
        </Paper>
      ))}
    </Stack>
  );
};
