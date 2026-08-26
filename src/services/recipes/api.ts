import {
  recipesResponseSchema,
  type CreateRecipeInput,
  type Recipe,
} from "../../models/Recipe";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getErrorMessage = async (response: Response, fallbackMessage: string) => {
  const message = await response.text();
  return message || fallbackMessage;
};

export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(`${BASE_URL}/recipes`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Kunde inte hämta recept."));
  }

  const data = await response.json();
  return recipesResponseSchema.parse(data);
};

export const addRecipe = async (recipe: CreateRecipeInput) => {
  const endpoint = recipe.url
    ? `${BASE_URL}/recipes/scrape`
    : `${BASE_URL}/recipes`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Kunde inte lägga till recept."),
    );
  }

  return response.json();
};
