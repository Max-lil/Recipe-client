import {
  Burger,
  Button,
  Collapse,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { BoxComponent } from "./BoxComponent";
import { useQuery } from "@tanstack/react-query";
import { useRecipesQuery } from "../services/recipes/queries";
import { RecipeSelector } from "./RecipeSelector";
import { useDisclosure } from "@mantine/hooks";
import type { ApiRecipeschema } from "../models/Recipe";

interface Props {
  dayKey: string;
  date: string;
  selectedRecipe: ApiRecipeschema | null;
  onSelectRecipe: (dayKey: string, recipe: ApiRecipeschema | null) => void;
}

export const DayPlanning = ({
  dayKey,
  date,
  selectedRecipe,
  onSelectRecipe,
}: Props) => {
  const { data, isPending } = useQuery(useRecipesQuery());
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
        {isPending ? (
          <Loader color="orange.5" size="xl" />
        ) : (
          <Collapse in={opened}>
            <RecipeSelector
              data={data}
              onSelect={(recipe) => onSelectRecipe(dayKey, recipe)}
              selectedRecipeId={selectedRecipe?.id}
            />
          </Collapse>
        )}
      </BoxComponent>
    </div>
  );
};
