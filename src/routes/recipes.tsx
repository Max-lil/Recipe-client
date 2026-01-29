import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { AddRecipeModal } from "../components/AddRecipeModal";
import { useState } from "react";

export const Route = createFileRoute("/recipes")({
  component: RouteComponent,
});

function RouteComponent() {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Button
        variant="filled"
        size="lg"
        color="green"
        onClick={() => setOpened(true)}
      >
        Lägg till recept
      </Button>
      <AddRecipeModal isOpen={opened} onClose={() => setOpened(false)} />
    </div>
  );
}
