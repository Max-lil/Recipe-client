import dayjs from "dayjs";
import { z } from "zod";

const optionalUrlSchema = z
  .string()
  .nullish()
  .transform((value) => value ?? undefined);

export const recipeBasicSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: optionalUrlSchema,
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

const weekStartDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "weekStartDate must use yyyy-MM-dd format.")
  .refine((value) => dayjs(value).isValid(), "weekStartDate must be a valid date.")
  .refine(
    (value) => dayjs(value).format("YYYY-MM-DD") === value,
    "weekStartDate must use yyyy-MM-dd format.",
  )
  .refine(
    (value) => dayjs(value).day() === 1,
    "weekStartDate must be a Monday.",
  );

export const loadWeekPlanRequestSchema = z.object({
  userId: z.number(),
  weekStartDate: weekStartDateSchema,
});

export const saveWeekPlanDaySchema = z.object({
  plannedDate: z.string(),
  recipeId: z.number().nullable(),
});

export const saveWeekPlanRequestSchema = z.object({
  userId: z.number(),
  weekStartDate: weekStartDateSchema,
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
export type LoadWeekPlanRequest = z.infer<typeof loadWeekPlanRequestSchema>;
export type SaveWeekPlanDay = z.infer<typeof saveWeekPlanDaySchema>;
export type SaveWeekPlanRequest = z.infer<typeof saveWeekPlanRequestSchema>;
export type PlanningDraftDay = z.infer<typeof planningDraftDaySchema>;
export type PlanningDraft = z.infer<typeof planningDraftSchema>;
