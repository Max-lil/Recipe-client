import { z } from "zod";

export const RecipeSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string().optional(),
});

export const CreateRecipeSchema = z.object({
  title: z.string(),
  url: z.string().optional(),
});

export type ApiRecipeschema = z.infer<typeof RecipeSchema>;

export type ApiCreateRecipeSchema = z.infer<typeof CreateRecipeSchema>;
