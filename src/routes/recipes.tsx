import { Button, Loader } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { AddRecipeModal } from "../components/AddRecipeModal";
import { useState } from "react";
import { useRecipesQuery } from "../services/recipes/queries";
import { useQuery } from "@tanstack/react-query";
import { BoxComponent } from "../components/BoxComponent";
import { RecipeTable } from "../components/RecipeTable";

export const Route = createFileRoute("/recipes")({
  component: RouteComponent,
});

function RouteComponent() {
  const [opened, setOpened] = useState(false);
  const { data, isPending } = useQuery(useRecipesQuery());

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="filled"
        size="lg"
        color="green"
        onClick={() => setOpened(true)}
      >
        Lägg till recept
      </Button>
      <AddRecipeModal isOpen={opened} onClose={() => setOpened(false)} />
      <BoxComponent>
        {isPending ? (
          <Loader color="orange.5" size="xl" />
        ) : (
          <RecipeTable data={data} />
        )}
      </BoxComponent>
    </div>
  );
}
