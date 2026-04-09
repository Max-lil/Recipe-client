import { useQuery } from "@tanstack/react-query";
import { shoppingListQueryOptions } from "../services/shoppinglist/queries";

export const ShoppingListComponent = ({
  weekPlanId,
}: {
  weekPlanId: number;
}) => {
  const { data, isLoading, isError } = useQuery(
    shoppingListQueryOptions(weekPlanId),
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <ul>
      {data?.map((item) => (
        <li key={item.id}>
          {item.quantity} {item.unit} - {item.name}
        </li>
      ))}
    </ul>
  );
};
