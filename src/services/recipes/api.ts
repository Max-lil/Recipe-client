import type { Recipe } from "../../models/Recipe";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RECIPE = "/recipes";

export const getRecipes = async(): Promise<Recipe[]> => {
    const response = await fetch(`${BASE_URL}${RECIPE}/all`);
    return await response.json();
}

export const addRecipe = async(recipe: Recipe) => {
    const response = await fetch(`${BASE_URL}${RECIPE}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
    });

    if (!response.ok) {
        throw new Error("Kunde inte lägga till recept!");
    }
    
    return response.json();
}