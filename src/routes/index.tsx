import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { BoxComponent } from "../components/BoxComponent";

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

            <Box
              data-container
              style={{
                backgroundColor: theme.other.surfaceLow,
                borderRadius: theme.radius.xl,
                padding: theme.spacing.md,
              }}
            >
              <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3 }}
                spacing={{ base: "lg", md: "lg" }}
              >
                <Button
                  variant="filled"
                  size="md"
                  radius="xl"
                  color="primary"
                  fullWidth
                  component={Link}
                  to="/recipes"
                >
                  Recept
                </Button>

                <Button
                  variant="subtle"
                  size="md"
                  radius="xl"
                  color="secondary"
                  fullWidth
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
