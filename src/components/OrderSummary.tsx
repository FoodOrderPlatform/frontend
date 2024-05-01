import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeItem: (cartItemId: string) => void;
};

export default function OrderSummary({
  restaurant,
  cartItems,
  removeItem,
}: Props) {
  const getTotalPrice = () => {
    const totalInPence = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const totalCostWithDelivery = totalInPence + restaurant.deliveryPrice;
    return (totalCostWithDelivery / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="flex justify-between text-2xl font-bold tracking-tight">
          <span>Your order</span>
          <span>${getTotalPrice()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between" key={item._id}>
            <span>
              <Badge>x {item.quantity}</Badge> {item.name}
            </span>
            <span className="flex flex-row items-center gap-2">
              <Trash
                className="cursor-pointer text-red-700 duration-300 hover:rotate-12"
                size={20}
                onClick={() => removeItem(item._id)}
              />{" "}
              {`$${(item.price / 100).toFixed(2)}`}
            </span>
          </div>
        ))}
        <Separator orientation="horizontal" />

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator orientation="horizontal" />
      </CardContent>
    </>
  );
}
