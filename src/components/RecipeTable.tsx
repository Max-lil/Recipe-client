import { Button, Table } from "@mantine/core";
import type { Recipe } from "../models/Recipe";

interface Props {
  data?: Recipe[];
}

export const RecipeTable = ({ data }: Props) => {
  return (
    <Table verticalSpacing="md" highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Namn</Table.Th>
          <Table.Th>URL</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {data?.map((recipe) => (
          <Table.Tr key={recipe.id}>
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
        ))}
      </Table.Tbody>
    </Table>
  );
};
