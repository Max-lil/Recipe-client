import { z } from "zod";

export const shoppingListItemSchema = z.object({
  id: z.number(),
  checked: z.boolean(),
  name: z.string(),
  quantity: z.number().nullable(),
  unit: z.string(),
  weekPlanId: z.number(),
});

export const shoppingListResponseSchema = z.array(shoppingListItemSchema);

export const createShoppingListItemSchema = z.object({
  name: z.string().trim().min(1),
  unit: z.string().trim().min(1),
  quantity: z.number().positive(),
});

export type ShoppingListItem = z.infer<typeof shoppingListItemSchema>;
export type CreateShoppingListItemInput = z.infer<
  typeof createShoppingListItemSchema
>;
