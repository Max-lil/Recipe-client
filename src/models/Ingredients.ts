import { z } from "zod";

export const ingredientSchema = z.object({
  id: z.number(),
  name: z.string(),
  quantity: z.number().nullable(),
  unit: z.string(),
  recipeId: z.number(),
  rawText: z.string().nullable(),
});

export const ingredientsResponseSchema = z.array(ingredientSchema);
export type Ingredient = z.infer<typeof ingredientSchema>;
