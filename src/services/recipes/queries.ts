import { queryOptions } from "@tanstack/react-query"
import { getRecipes } from "./api"

export const useRecipesQuery = () => {
    return queryOptions({
        queryKey: ["recipes"],
        queryFn: getRecipes,
    })
}