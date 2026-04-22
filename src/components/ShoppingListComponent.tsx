import { useQuery } from "@tanstack/react-query";
import { Alert, Button, Group, List, Loader, Stack, Text } from "@mantine/core";
import { useState, type ReactNode } from "react";
import { AddShoppingListItemModal } from "./AddShoppingListItemModal";
import { shoppingListQueryOptions } from "../services/shoppinglist/queries";

interface Props {
  weekPlanId: number;
}

export const ShoppingListComponent = ({ weekPlanId }: Props) => {
  const [modalOpened, setModalOpened] = useState(false);
  const shoppingListQuery = useQuery(shoppingListQueryOptions(weekPlanId));

  let content: ReactNode;

  if (shoppingListQuery.isPending) {
    content = <Loader color="orange.5" size="xl" />;
  } else if (shoppingListQuery.isError) {
    content = (
      <Alert color="red" title={"Kunde inte h\u00E4mta ink\u00F6pslistan"}>
        {shoppingListQuery.error instanceof Error
          ? shoppingListQuery.error.message
          : "Ett ov\u00E4ntat fel uppstod."}
      </Alert>
    );
  } else if (shoppingListQuery.data.length === 0) {
    content = <Text>{"Det finns inga ingredienser i ink\u00F6pslistan \u00E4nnu."}</Text>;
  } else {
    const sortedShoppingList = [...shoppingListQuery.data].sort((left, right) =>
      left.name.localeCompare(right.name, "sv", { sensitivity: "base" }),
    );

    content = (
      <List spacing="xs">
        {sortedShoppingList.map((item) => (
          <List.Item key={item.id}>
            {item.quantity !== null ? `${item.quantity} ${item.unit} ` : ""}
            {item.name}
          </List.Item>
        ))}
      </List>
    );
  }

  return (
    <>
      <Stack gap="sm">
        <Group justify="space-between" align="center">
          <Text fw={600}>Ingredienser</Text>

          <Button size="sm" onClick={() => setModalOpened(true)}>
            Lägg till ingrediens
          </Button>
        </Group>

        {content}
      </Stack>

      <AddShoppingListItemModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        weekPlanId={weekPlanId}
      />
    </>
  );
};
