import {
  ActionIcon,
  Button,
  Collapse,
  Loader,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconExternalLink } from "@tabler/icons-react";
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
  const theme = useMantineTheme();
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
                  component="a"
                  href={selectedRecipe.url}
                  target="_blank"
                  size="xs"
                  w="fit-content"
                  leftSection={<IconExternalLink size={14} />}
                  style={{
                    backgroundColor: theme.other.tertiaryContainer,
                    color: theme.other.onTertiaryContainer,
                  }}
                >
                  Till recept
                </Button>
              ) : null}
            </Stack>
          ) : (
            <Text c="dimmed">Inget recept valt</Text>
          )}
        </Stack>

        <ActionIcon
          onClick={toggle}
          aria-label="Visa receptval"
          size="lg"
        >
          <IconChevronDown
            size={20}
            style={{
              transform: opened ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 200ms ease",
            }}
          />
        </ActionIcon>

        {isRecipesLoading ? (
          <Loader color="secondary.5" size="xl" />
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
