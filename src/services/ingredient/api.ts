import {
  ingredientsResponseSchema,
  type Ingredient,
} from "../../models/Ingredients";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getIngredientsByRecipeId = async (
  recipeId: number,
): Promise<Ingredient[]> => {
  const response = await fetch(`${BASE_URL}/ingredients/${recipeId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ingredients: ${response.statusText}`);
  }

  const data = await response.json();
  return ingredientsResponseSchema.parse(data);
};
