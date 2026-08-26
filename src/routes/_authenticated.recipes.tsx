import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Alert, Button, Loader, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { AddRecipeModal } from "../components/AddRecipeModal";
import { BoxComponent } from "../components/BoxComponent";
import { RecipeTable } from "../components/RecipeTable";
import { recipesQueryOptions } from "../services/recipes/queries";

export const Route = createFileRoute("/_authenticated/recipes")({
  component: RouteComponent,
});

function RouteComponent() {
  const [opened, setOpened] = useState(false);
  const recipesQuery = useQuery(recipesQueryOptions());

  return (
    <Stack gap="lg">
      <Title order={1} fw={700}>
        Recept
      </Title>

      <Button
        variant="filled"
        size="lg"
        onClick={() => setOpened(true)}
        leftSection={<IconPlus size={18} />}
      >
        Lägg till recept
      </Button>

      <AddRecipeModal isOpen={opened} onClose={() => setOpened(false)} />

      <BoxComponent>
        {recipesQuery.isPending ? (
          <Loader color="secondary.5" size="xl" />
        ) : null}

        {recipesQuery.isError ? (
          <Alert color="danger" title="Kunde inte hämta recept">
            {recipesQuery.error instanceof Error
              ? recipesQuery.error.message
              : "Ett oväntat fel uppstod."}
          </Alert>
        ) : null}

        {recipesQuery.isSuccess && recipesQuery.data.length === 0 ? (
          <Text>Det finns inga recept än.</Text>
        ) : null}

        {recipesQuery.isSuccess && recipesQuery.data.length > 0 ? (
          <RecipeTable data={recipesQuery.data} />
        ) : null}
      </BoxComponent>
    </Stack>
  );
}
