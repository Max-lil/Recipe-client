import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Container,
  SimpleGrid,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { BoxComponent } from "../components/BoxComponent";
import { CardComponent } from "../components/CardComponent";
import { IconCalendarWeek } from "@tabler/icons-react";
import { IconBasket } from "@tabler/icons-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const theme = useMantineTheme();

  return (
    <div className="flex-auto">
      <Container strategy="grid">
        <div className="flex flex-col gap-8">
          <Box>
            <Title order={1} fw={700}>
              Välkommen!
            </Title>
          </Box>

          <BoxComponent>
            <Title order={3} fw={600} c={theme.other.textPrimary} mb="md">
              Vad vill du göra idag?
            </Title>

            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3 }}
              spacing={{ base: "lg", md: "lg" }}
            >
              <CardComponent
                icon={IconCalendarWeek}
                header="Veckoplanering"
                body="Planera dina måltider"
                to="/weeklyplanning"
              />

              <CardComponent
                icon={IconBasket}
                header="Inköpslista"
                body="Se din inköpslista för veckan"
                to="/shoppinglist"
              />
            </SimpleGrid>
          </BoxComponent>
        </div>
      </Container>
    </div>
  );
}
