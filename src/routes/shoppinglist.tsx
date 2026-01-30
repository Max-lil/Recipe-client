import { createFileRoute } from "@tanstack/react-router";
import { BoxComponent } from "../components/BoxComponent";
import { Title } from "@mantine/core";

export const Route = createFileRoute("/shoppinglist")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Title order={1} fw={700}>
        InköpsLista
      </Title>
      <BoxComponent>
        <div>Hello "/shoppinglist"!</div>
      </BoxComponent>
    </div>
  );
}
