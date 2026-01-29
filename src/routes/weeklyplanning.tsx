import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/weeklyplanning")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/weeklyplanning"</div>;
}
