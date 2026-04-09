import {
  shoppingListResponseSchema,
  type ShoppingListItem,
} from "../../models/ShoppingList";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getShoppingListByWeekPlanId = async (
  weekPlanId: number,
): Promise<ShoppingListItem[]> => {
  const response = await fetch(`${BASE_URL}/shoppinglist/${weekPlanId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch shopping list: ${response.statusText}`);
  }

  const data = await response.json();
  return shoppingListResponseSchema.parse(data);
};
