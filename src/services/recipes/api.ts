import type {
  ApiCreateRecipeSchema,
  ApiRecipeschema,
} from "../../models/Recipe";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getRecipes = async (): Promise<ApiRecipeschema[]> => {
  const response = await fetch(`${BASE_URL}/recipes`);
  return await response.json();
};

export const addRecipe = async (recipe: ApiCreateRecipeSchema) => {
  const endpoint = recipe.url
    ? `${BASE_URL}/recipes/scrape`
    : `${BASE_URL}/recipes`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Kunde inte lagga till recept!");
  }

  return response.json();
};
