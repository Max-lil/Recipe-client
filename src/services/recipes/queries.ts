import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { addRecipe, getRecipes } from "./api";
import type { CreateRecipe } from "../../models/CreateRecipe";

export const useRecipesQuery = () => {
  return queryOptions({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });
};

export const useAddRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipe: CreateRecipe) => addRecipe(recipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};
