import { useQuery } from "@tanstack/react-query";
import { Alert, List, Loader, Stack, Text } from "@mantine/core";
import { shoppingListQueryOptions } from "../services/shoppinglist/queries";

interface Props {
  weekPlanId: number;
}

export const ShoppingListComponent = ({ weekPlanId }: Props) => {
  const shoppingListQuery = useQuery(shoppingListQueryOptions(weekPlanId));

  if (shoppingListQuery.isPending) {
    return <Loader color="orange.5" size="xl" />;
  }

  if (shoppingListQuery.isError) {
    return (
      <Alert color="red" title={"Kunde inte h\u00E4mta ink\u00F6pslistan"}>
        {shoppingListQuery.error instanceof Error
          ? shoppingListQuery.error.message
          : "Ett ov\u00E4ntat fel uppstod."}
      </Alert>
    );
  }

  if (shoppingListQuery.data.length === 0) {
    return <Text>{"Det finns inga ingredienser i ink\u00F6pslistan \u00E4nnu."}</Text>;
  }

  const sortedShoppingList = [...shoppingListQuery.data].sort((left, right) =>
    left.name.localeCompare(right.name, "sv", { sensitivity: "base" }),
  );

  return (
    <Stack gap="sm">
      <Text fw={600}>Ingredienser</Text>

      <List spacing="xs">
        {sortedShoppingList.map((item) => (
          <List.Item key={item.id}>
            {item.quantity !== null ? `${item.quantity} ${item.unit} ` : ""}
            {item.name}
          </List.Item>
        ))}
      </List>
    </Stack>
  );
};
