import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/shoppinglist')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/shoppinglist"!</div>
}
