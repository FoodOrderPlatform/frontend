import { useGetOrders } from "@/api/OrderApi";
import OrderStatusDetails from "@/components/OrderStatusDetails";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetOrders();

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (!orders) {
    return <p>Orders not found</p>;
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="m-8 space-y-10 rounded-md bg-muted p-8" key={order._id}>
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetails order={order} />
            <AspectRatio ratio={16 / 9}>
              <img
                src={order.restaurant.imageUrl}
                className="h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
