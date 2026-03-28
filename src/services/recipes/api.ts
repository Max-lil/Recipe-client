import type { CreateRecipe } from "../../models/CreateRecipe";
import type { Recipe } from "../../models/Recipe";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(`${BASE_URL}/recipes`);
  return await response.json();
};

export const addRecipe = async (recipe: CreateRecipe) => {
  const response = await fetch(`${BASE_URL}/recipes`, {
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
};
