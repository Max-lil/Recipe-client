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

export type ShoppingListItem = z.infer<typeof shoppingListItemSchema>;
