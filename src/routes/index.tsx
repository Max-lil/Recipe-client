import { createFileRoute } from "@tanstack/react-router";
import { Box, Button, Container, SimpleGrid, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex-auto">
      <Container strategy="block">
        <div className="flex flex-col gap-4">
          <Box>
            <Text size="xl" fw={800}>
              Välkommen!
            </Text>
          </Box>
          <Box data-breakout>
            <Text size="xl" fw={600}>
              Vad vill du göra idag?
            </Text>
          </Box>
          <Box data-container>
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3 }}
              spacing={{ base: "sm", md: "lg" }}
            >
              <Button
                variant="filled"
                size="md"
                radius="lg"
                color="orange"
                fullWidth={true}
                component={Link}
                to="/recipes"
                onClick={close}
              >
                Recept
              </Button>
              <Button
                variant="filled"
                size="md"
                radius="lg"
                color="orange"
                fullWidth={true}
              >
                Veckoplanering
              </Button>
            </SimpleGrid>
          </Box>
        </div>
      </Container>
    </div>
  );
}
