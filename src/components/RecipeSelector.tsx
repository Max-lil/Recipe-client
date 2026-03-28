import { useState } from "react";
import type { Recipe } from "../models/Recipe";
import { Button, Checkbox, Table } from "@mantine/core";

interface Props {
  data?: Recipe[];
}

export const RecipeSelector = ({ data }: Props) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  console.log("query data", data);

  const rows = data?.map((recipe) => (
    <Table.Tr
      key={recipe.id}
      bg={
        selectedRows.includes(recipe.id)
          ? "var(--mantine-color-blue-light)"
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          aria-label={`Select ${recipe.title}`}
          checked={selectedRows.includes(recipe.id)}
          onClick={() =>
            setSelectedRows((prev) =>
              prev.includes(recipe.id)
                ? prev.filter((id) => id !== recipe.id)
                : [...prev, recipe.id],
            )
          }
        />
      </Table.Td>
      <Table.Td>{recipe.title}</Table.Td>
      <Table.Td>
        <Button
          color="orange.5"
          component="a"
          href={recipe.url}
          target="_blank"
          size="sm"
        >
          Till recept
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
          <Table.Th>Namn</Table.Th>
          <Table.Th>URL</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
