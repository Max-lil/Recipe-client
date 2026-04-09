import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { addRecipe, getRecipes } from "./api";
import type { ApiCreateRecipeSchema } from "../../models/Recipe";

export const useRecipesQuery = () => {
  return queryOptions({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });
};

export const useAddRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipe: ApiCreateRecipeSchema) => addRecipe(recipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};
