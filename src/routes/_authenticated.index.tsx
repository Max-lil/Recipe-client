import { IconBasket, IconCalendarWeek, IconToolsKitchen2 } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { SimpleGrid, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { CardComponent } from "../components/CardComponent";

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
});

function RouteComponent() {
  const theme = useMantineTheme();

  return (
    <Stack gap="xl">
      <Stack gap="xs" maw={640}>
        <Title order={1} fw={700} fz={{ base: 32, sm: 44 }} lh={1.1}>
          Välkommen!
        </Title>
        <Text size="lg" c={theme.other.textSecondary}>
          Vad vill du göra idag?
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        <CardComponent
          icon={IconCalendarWeek}
          header="Veckoplanering"
          body="Planera dina måltider"
          to="/weeklyplanning"
          accent="primary"
        />

        <CardComponent
          icon={IconToolsKitchen2}
          header="Recept"
          body="Bläddra bland dina sparade recept"
          to="/recipes"
          accent="secondary"
        />

        <CardComponent
          icon={IconBasket}
          header="Inköpslista"
          body="Se din inköpslista för veckan"
          to="/shoppinglist"
          accent="tertiary"
        />
      </SimpleGrid>
    </Stack>
  );
}
