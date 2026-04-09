import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { loadWeekPlan, saveWeekPlan } from "./api";
import type { SaveWeekPlanRequest } from "../../models/Planning";

export const weekPlanQueryOptions = (
  userId: number,
  weekStartDate?: string,
) =>
  queryOptions({
    queryKey: ["planning", userId, weekStartDate],
    queryFn: () => loadWeekPlan(userId, weekStartDate!),
    enabled: !!weekStartDate,
  });

export const useSaveWeekPlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SaveWeekPlanRequest) => saveWeekPlan(payload),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["planning", variables.userId, variables.weekStartDate],
        data,
      );
    },
  });
};
