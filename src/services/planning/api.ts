import {
  loadWeekPlanRequestSchema,
  saveWeekPlanRequestSchema,
  weekPlanSchema,
  type LoadWeekPlanRequest,
  type SaveWeekPlanRequest,
  type WeekPlan,
} from "../../models/Planning";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getErrorMessage = async (response: Response, fallbackMessage: string) => {
  const message = await response.text();
  return message || fallbackMessage;
};

export const loadWeekPlan = async (
  userId: number,
  weekStartDate: string,
): Promise<WeekPlan> => {
  const payload: LoadWeekPlanRequest = loadWeekPlanRequestSchema.parse({
    userId,
    weekStartDate,
  });

  const response = await fetch(`${BASE_URL}/planning/week`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Kunde inte h\u00E4mta veckoplaneringen.",
      ),
    );
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
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Kunde inte spara veckoplaneringen.",
      ),
    );
  }

  const data = await response.json();
  return weekPlanSchema.parse(data);
};
