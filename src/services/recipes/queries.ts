import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { addRecipe, getRecipes } from "./api";
import type { CreateRecipeInput } from "../../models/Recipe";

export const recipesQueryOptions = () => {
  return queryOptions({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });
};

export const useAddRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipe: CreateRecipeInput) => addRecipe(recipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};
