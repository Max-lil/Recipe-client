import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { addRecipe, getRecipes } from "./api"
import type { Recipe } from "../../models/Recipe"

export const useRecipesQuery = () => {
    return queryOptions({
        queryKey: ["recipes"],
        queryFn: getRecipes,
    });
};

export const useAddRecipeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (recipe: Recipe) => addRecipe(recipe),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipes"]});
        },
    });
};