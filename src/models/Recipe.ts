import { z } from "zod";

const optionalUrlSchema = z
  .string()
  .nullish()
  .transform((value) => value ?? undefined);

export const recipeSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: optionalUrlSchema,
});

export const recipesResponseSchema = z.array(recipeSchema);

export const createRecipeSchema = z.object({
  title: z.string(),
  url: z.string().optional(),
});

export type Recipe = z.infer<typeof recipeSchema>;
export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
