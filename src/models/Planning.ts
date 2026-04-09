import { z } from "zod";

export const recipeBasicSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string().optional(),
});

export const dayPlanSchema = z.object({
  id: z.number(),
  plannedDate: z.string(),
  recipe: recipeBasicSchema.nullable(),
});

export const weekPlanSchema = z.object({
  id: z.number(),
  weekStartDate: z.string(),
  status: z.string().nullable(),
  days: z.array(dayPlanSchema),
});

export const saveWeekPlanDaySchema = z.object({
  plannedDate: z.string(),
  recipeId: z.number().nullable(),
});

export const saveWeekPlanRequestSchema = z.object({
  userId: z.number(),
  weekStartDate: z.string(),
  days: z.array(saveWeekPlanDaySchema),
});

export const planningDraftDaySchema = z.object({
  id: z.number().optional(),
  plannedDate: z.string(),
  recipe: recipeBasicSchema.nullable(),
});

export const planningDraftSchema = z.object({
  weekPlanId: z.number().optional(),
  weekStartDate: z.string(),
  days: z.array(planningDraftDaySchema),
});

export type RecipeBasic = z.infer<typeof recipeBasicSchema>;
export type DayPlan = z.infer<typeof dayPlanSchema>;
export type WeekPlan = z.infer<typeof weekPlanSchema>;
export type SaveWeekPlanDay = z.infer<typeof saveWeekPlanDaySchema>;
export type SaveWeekPlanRequest = z.infer<typeof saveWeekPlanRequestSchema>;
export type PlanningDraftDay = z.infer<typeof planningDraftDaySchema>;
export type PlanningDraft = z.infer<typeof planningDraftSchema>;
