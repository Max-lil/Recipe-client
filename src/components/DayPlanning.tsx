import { Loader, Title } from "@mantine/core";
import { BoxComponent } from "./BoxComponent";
import { useQuery } from "@tanstack/react-query";
import { useRecipesQuery } from "../services/recipes/queries";
import { RecipeSelector } from "./RecipeSelector";

interface Props {
  date: string;
}

export const DayPlanning = ({ date }: Props) => {
  const { data, isPending } = useQuery(useRecipesQuery());

  return (
    <div>
      <Title order={2}>{date}</Title>
      <BoxComponent>
        {isPending ? (
          <Loader color="orange.5" size="xl" />
        ) : (
          <RecipeSelector data={data} />
        )}
      </BoxComponent>
    </div>
  );
};
