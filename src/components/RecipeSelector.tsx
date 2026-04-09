import {
  Button,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import type { Recipe } from "../models/Recipe";

interface Props {
  data?: Recipe[];
  onSelect: (recipe: Recipe | null) => void;
  selectedRecipeId?: number;
}

export const RecipeSelector = ({ data, onSelect, selectedRecipeId }: Props) => {
  const isSelected = (id: number) => selectedRecipeId === id;

  const desktopRows = data?.map((recipe) => (
    <Table.Tr
      key={recipe.id}
      bg={isSelected(recipe.id) ? "var(--mantine-color-blue-light)" : undefined}
    >
      <Table.Td>
        <Button
          color={isSelected(recipe.id) ? "blue" : "gray"}
          onClick={() => onSelect(isSelected(recipe.id) ? null : recipe)}
          size="xs"
          variant={isSelected(recipe.id) ? "filled" : "light"}
        >
          {isSelected(recipe.id) ? "Vald" : "Välj"}
        </Button>
      </Table.Td>
      <Table.Td>{recipe.title}</Table.Td>
      <Table.Td>
        {recipe.url ? (
          <Button
            color="orange.5"
            component="a"
            href={recipe.url}
            target="_blank"
            size="sm"
          >
            Till recept
          </Button>
        ) : null}
      </Table.Td>
    </Table.Tr>
  ));

  const mobileRows = data?.map((recipe) => (
    <Paper
      key={recipe.id}
      p="sm"
      radius="md"
      withBorder
      bg={isSelected(recipe.id) ? "var(--mantine-color-blue-light)" : "white"}
    >
      <Stack gap="sm">
        <Group align="flex-start" wrap="nowrap">
          <Text fw={500} style={{ flex: 1, wordBreak: "break-word" }}>
            {recipe.title}
          </Text>
        </Group>

        <Group grow>
          <Button
            color={isSelected(recipe.id) ? "blue" : "gray"}
            onClick={() => onSelect(isSelected(recipe.id) ? null : recipe)}
            size="xs"
            variant={isSelected(recipe.id) ? "filled" : "light"}
          >
            {isSelected(recipe.id) ? "Vald" : "Välj"}
          </Button>

          {recipe.url ? (
            <Button
              color="orange.5"
              component="a"
              href={recipe.url}
              target="_blank"
              size="xs"
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
        {mobileRows}
      </Stack>

      <ScrollArea h={300} visibleFrom="sm">
        <Table miw={700} stickyHeader>
          <Table.Thead bg="white">
            <Table.Tr>
              <Table.Th>Välj</Table.Th>
              <Table.Th>Namn</Table.Th>
              <Table.Th>URL</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{desktopRows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
};
