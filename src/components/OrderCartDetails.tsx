import { Order } from "@/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
  order: Order;
};

const OrderCardDetails = ({ order }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid grid-cols-2 items-start justify-between gap-2 font-semibold md:grid-cols-4">
          <span>
            Customer name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </span>
          <span>
            Address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.address}, {order.deliveryDetails.city}
            </span>
          </span>
          <span>
            Time:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </span>
          <span>
            Total Cost:
            <span className="ml-2 font-normal">
              {(order.totalAmount / 100).toFixed(2)} $
            </span>
          </span>
        </CardTitle>
        <Separator orientation="horizontal" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-2">
          {order.cartItems.map((item) => (
            <div className="flex items-center gap-2" key={item.menuItemId}>
              <Badge variant="outline">{item.quantity}</Badge>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`status-${order._id}`}>
            What is status of this order?
          </Label>
          <Select>
            <SelectTrigger id={`status-${order._id}`}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCardDetails;
