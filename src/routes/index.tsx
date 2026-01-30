import { createFileRoute } from "@tanstack/react-router";
import { Box, Button, Container, SimpleGrid, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { BoxComponent } from "../components/BoxComponent";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
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
            <Title order={3} fw={600}>
              Vad vill du göra idag?
            </Title>
            <Box data-container>
              <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3 }}
                spacing={{ base: "lg", md: "lg" }}
              >
                <Button
                  variant="filled"
                  size="md"
                  radius="lg"
                  color="orange"
                  fullWidth={true}
                  component={Link}
                  to="/recipes"
                >
                  Recept
                </Button>
                <Button
                  variant="filled"
                  size="md"
                  radius="lg"
                  color="orange"
                  fullWidth={true}
                  component={Link}
                  to="/weeklyplanning"
                >
                  Veckoplanering
                </Button>
              </SimpleGrid>
            </Box>
          </BoxComponent>
        </div>
      </Container>
    </div>
  );
}
