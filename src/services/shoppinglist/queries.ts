import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { addShoppingListItem, getShoppingListByWeekPlanId } from "./api";
import type { CreateShoppingListItemInput } from "../../models/ShoppingList";

export const shoppingListQueryOptions = (weekPlanId: number) =>
  queryOptions({
    queryKey: ["shoppinglist", weekPlanId],
    queryFn: () => getShoppingListByWeekPlanId(weekPlanId),
    enabled: !!weekPlanId,
  });

export const useAddShoppingListItemMutation = (weekPlanId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: CreateShoppingListItemInput) =>
      addShoppingListItem(weekPlanId, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppinglist", weekPlanId] });
    },
  });
};
