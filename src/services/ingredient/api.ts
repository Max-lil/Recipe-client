import {
  ingredientsResponseSchema,
  type Ingredient,
} from "../../models/Ingredients";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getErrorMessage = async (response: Response, fallbackMessage: string) => {
  const message = await response.text();
  return message || fallbackMessage;
};

export const getIngredientsByRecipeId = async (
  recipeId: number,
): Promise<Ingredient[]> => {
  const response = await fetch(`${BASE_URL}/ingredients/${recipeId}`);

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Kunde inte hämta ingredienser."),
    );
  }

  const data = await response.json();
  return ingredientsResponseSchema.parse(data);
};
