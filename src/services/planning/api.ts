import {
  saveWeekPlanRequestSchema,
  weekPlanSchema,
  type SaveWeekPlanRequest,
  type WeekPlan,
} from "../../models/Planning";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getWeekPlan = async (
  userId: number,
  weekStartDate: string,
): Promise<WeekPlan | null> => {
  const params = new URLSearchParams({
    userId: String(userId),
    weekStartDate,
  });

  const response = await fetch(`${BASE_URL}/planning/week?${params.toString()}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch week plan: ${response.statusText}`);
  }

  const data = await response.json();
  return weekPlanSchema.parse(data);
};

export const saveWeekPlan = async (
  payload: SaveWeekPlanRequest,
): Promise<WeekPlan> => {
  const parsedPayload = saveWeekPlanRequestSchema.parse(payload);

  const response = await fetch(`${BASE_URL}/planning/week`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedPayload),
  });

  if (!response.ok) {
    throw new Error(`Failed to save week plan: ${response.statusText}`);
  }

  const data = await response.json();
  return weekPlanSchema.parse(data);
};
