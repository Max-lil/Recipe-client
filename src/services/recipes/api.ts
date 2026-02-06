import type { Recipe } from "../../models/Recipe";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const RECIPE = "/recipes";

export const getRecipes = async(): Promise<Recipe[]> => {
    const ALL = "/all";
    const response = await fetch(`${baseUrl}${RECIPE}${ALL}`);
    return await response.json();
}