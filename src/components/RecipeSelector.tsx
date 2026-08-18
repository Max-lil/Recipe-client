import {
  Button,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconCheck, IconExternalLink } from "@tabler/icons-react";
import type { Recipe } from "../models/Recipe";

interface Props {
  data?: Recipe[];
  onSelect: (recipe: Recipe | null) => void;
  selectedRecipeId?: number;
}

export const RecipeSelector = ({ data, onSelect, selectedRecipeId }: Props) => {
  const theme = useMantineTheme();

  const isSelected = (id: number) => selectedRecipeId === id;

  const rows = data?.map((recipe) => (
    <Paper
      key={recipe.id}
      p="sm"
      radius="xl"
      bg={
        isSelected(recipe.id)
          ? theme.other.primaryContainer
          : theme.other.surfaceLowest
      }
    >
      <Stack gap="sm">
        <Group align="flex-start" wrap="nowrap">
          <Text fw={500} style={{ flex: 1, wordBreak: "break-word" }}>
            {recipe.title}
          </Text>
        </Group>

        <Group grow>
          <Button
            color="primary"
            onClick={() => onSelect(isSelected(recipe.id) ? null : recipe)}
            size="xs"
            variant={isSelected(recipe.id) ? "filled" : "default"}
            leftSection={
              isSelected(recipe.id) ? <IconCheck size={14} /> : undefined
            }
          >
            {isSelected(recipe.id) ? "Vald" : "Välj"}
          </Button>

          {recipe.url ? (
            <Button
              component="a"
              href={recipe.url}
              target="_blank"
              size="xs"
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
      </Stack>
    </Paper>
  ));

  return (
    <>
      <Stack hiddenFrom="sm" gap="sm">
        {rows}
      </Stack>

      <ScrollArea h={300} visibleFrom="sm">
        <Stack gap="sm" p={2}>
          {rows}
        </Stack>
      </ScrollArea>
    </>
  );
};
