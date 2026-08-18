import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Button,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconCircle, IconPlus } from "@tabler/icons-react";
import { useState, type ReactNode } from "react";
import { AddShoppingListItemModal } from "./AddShoppingListItemModal";
import { shoppingListQueryOptions } from "../services/shoppinglist/queries";

interface Props {
  weekPlanId: number;
}

export const ShoppingListComponent = ({ weekPlanId }: Props) => {
  const theme = useMantineTheme();
  const [modalOpened, setModalOpened] = useState(false);
  const shoppingListQuery = useQuery(shoppingListQueryOptions(weekPlanId));

  let content: ReactNode;

  if (shoppingListQuery.isPending) {
    content = <Loader color="secondary.5" size="xl" />;
  } else if (shoppingListQuery.isError) {
    content = (
      <Alert color="danger" title={"Kunde inte h\u00E4mta ink\u00F6pslistan"}>
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
      <Stack gap="xs">
        {sortedShoppingList.map((item) => (
          <Paper key={item.id} p="sm" radius="xl" bg={theme.other.surfaceLowest}>
            <Group gap="sm" wrap="nowrap">
              <IconCircle size={20} color={theme.other.outlineVariant} />
              <Text>
                {item.quantity !== null ? `${item.quantity} ${item.unit} ` : ""}
                {item.name}
              </Text>
            </Group>
          </Paper>
        ))}
      </Stack>
    );
  }

  return (
    <>
      <Stack gap="sm">
        <Group justify="space-between" align="center">
          <Text fw={600}>Ingredienser</Text>

          <Button
            size="sm"
            onClick={() => setModalOpened(true)}
            leftSection={<IconPlus size={16} />}
          >
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
