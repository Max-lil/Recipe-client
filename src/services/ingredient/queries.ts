import { queryOptions } from "@tanstack/react-query";
import { getIngredientsByRecipeId } from "./api";

export const ingredientsQueryOptions = (recipeId: number) =>
  queryOptions({
    queryKey: ["ingredients", recipeId],
    queryFn: () => getIngredientsByRecipeId(recipeId),
    enabled: !!recipeId,
  });
