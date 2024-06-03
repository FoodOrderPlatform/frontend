import { Order } from "@/types";
import { Progress } from "@/components/ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedTime = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime,
    );
    const minutes = created.getMinutes();
    const hours = created.getHours();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes}`;
  };

  const orderStatus =
    ORDER_STATUS[ORDER_STATUS.findIndex((item) => item.value === order.status)];

  return (
    <>
      <div className="flex flex-col gap-5 text-3xl font-semibold tracking-tighter md:flex-row md:justify-between">
        <span>Order status: {orderStatus.label}</span>
        <span>Expected by: {getExpectedTime()}</span>
      </div>
      <Progress className="animate-pulse" value={orderStatus.progressValue} />
    </>
  );
};

export default OrderStatusHeader;
