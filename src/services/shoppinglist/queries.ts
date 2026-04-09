import { queryOptions } from "@tanstack/react-query";
import { getShoppingListByWeekPlanId } from "./api";

export const shoppingListQueryOptions = (weekPlanId: number) =>
  queryOptions({
    queryKey: ["shoppinglist", weekPlanId],
    queryFn: () => getShoppingListByWeekPlanId(weekPlanId),
    enabled: !!weekPlanId,
  });
