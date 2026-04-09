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
      <Alert color="red" title="Kunde inte hämta inköpslistan">
        {shoppingListQuery.error instanceof Error
          ? shoppingListQuery.error.message
          : "Ett oväntat fel uppstod."}
      </Alert>
    );
  }

  if (shoppingListQuery.data.length === 0) {
    return <Text>Det finns inga ingredienser i inköpslistan ännu.</Text>;
  }

  return (
    <Stack gap="sm">
      <Text fw={600}>Ingredienser</Text>

      <List spacing="xs">
        {shoppingListQuery.data.map((item) => (
          <List.Item key={item.id}>
            {item.quantity !== null ? `${item.quantity} ${item.unit} ` : ""}
            {item.name}
          </List.Item>
        ))}
      </List>
    </Stack>
  );
};
