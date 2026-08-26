import {
  createShoppingListItemSchema,
  shoppingListResponseSchema,
  type CreateShoppingListItemInput,
  type ShoppingListItem,
} from "../../models/ShoppingList";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getErrorMessage = async (response: Response, fallbackMessage: string) => {
  const message = await response.text();
  return message || fallbackMessage;
};

export const getShoppingListByWeekPlanId = async (
  weekPlanId: number,
): Promise<ShoppingListItem[]> => {
  const response = await fetch(`${BASE_URL}/shoppinglist/${weekPlanId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Kunde inte hämta inköpslistan."),
    );
  }

  const data = await response.json();
  return shoppingListResponseSchema.parse(data);
};

export const addShoppingListItem = async (
  weekPlanId: number,
  item: CreateShoppingListItemInput,
): Promise<void> => {
  const payload = createShoppingListItemSchema.parse(item);

  const response = await fetch(`${BASE_URL}/shoppinglist/${weekPlanId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Kunde inte lägga till ingrediensen."),
    );
  }

  if (response.status === 204) {
    return;
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    await response.json();
    return;
  }

  await response.text();
};
