import {
  Burger,
  Button,
  Collapse,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { Recipe } from "../models/Recipe";
import { BoxComponent } from "./BoxComponent";
import { RecipeSelector } from "./RecipeSelector";

interface Props {
  dayKey: string;
  date: string;
  recipes?: Recipe[];
  isRecipesLoading: boolean;
  selectedRecipe: Recipe | null;
  onSelectRecipe: (dayKey: string, recipe: Recipe | null) => void;
}

export const DayPlanning = ({
  dayKey,
  date,
  recipes,
  isRecipesLoading,
  selectedRecipe,
  onSelectRecipe,
}: Props) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div>
      <Title order={2}>{date}</Title>

      <BoxComponent>
        <Stack gap="xs">
          <Text fw={500}>Valt recept</Text>

          {selectedRecipe ? (
            <Stack gap="xs">
              <Text>{selectedRecipe.title}</Text>

              {selectedRecipe.url ? (
                <Button
                  color="orange.5"
                  component="a"
                  href={selectedRecipe.url}
                  target="_blank"
                  size="xs"
                  w="fit-content"
                >
                  Till recept
                </Button>
              ) : null}
            </Stack>
          ) : (
            <Text c="dimmed">Inget recept valt</Text>
          )}
        </Stack>

        <Burger variant="filled" opened={opened} onClick={toggle} />

        {isRecipesLoading ? (
          <Loader color="orange.5" size="xl" />
        ) : (
          <Collapse in={opened}>
            <RecipeSelector
              data={recipes}
              onSelect={(recipe) => onSelectRecipe(dayKey, recipe)}
              selectedRecipeId={selectedRecipe?.id}
            />
          </Collapse>
        )}
      </BoxComponent>
    </div>
  );
};
