import { useGetRestautant } from "@/api/RestauransApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfile";
import { MenuItem as MenuItemType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function DetailPage() {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestautant(restaurantId);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const onCheckoutHandler = (userFormData: UserFormData) => {
    console.log(userFormData);
  };

  const addToCartItemsHandler = (menuItem: MenuItemType) => {
    const currentIndexItem = cartItems.findIndex(
      (item) => item._id === menuItem._id,
    );
    if (currentIndexItem === -1) {
      setCartItems((prevState) => {
        const updatedItems = [
          ...prevState,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
        sessionStorage.setItem(
          `cartItems-${restaurantId}`,
          JSON.stringify(updatedItems),
        );

        return updatedItems;
      });
    } else {
      setCartItems((prevState) => {
        const updateItems = prevState.map((item) =>
          item._id === menuItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        sessionStorage.setItem(
          `cartItems-${restaurantId}`,
          JSON.stringify(updateItems),
        );

        return updateItems;
      });
    }
  };
  const removeCartItemsHandler = (cartItemId: string) => {
    setCartItems((prevState) => {
      const updatedItems = prevState.filter((item) => item._id !== cartItemId);
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedItems),
      );
      return updatedItems;
    });
  };

  if (isLoading || !restaurant) {
    return <p>is loading ...</p>;
  }

  return (
    <div className="my-8 flex flex-col gap-10 px-4">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
      <div className="grid gap-5 md:grid-cols-[4fr_2fr] md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((item) => (
            <MenuItem
              key={item._id}
              menuItem={item}
              addToCart={addToCartItemsHandler}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeItem={removeCartItemsHandler}
            />
            <CardFooter>
              <CheckoutButton
                disable={cartItems.length === 0}
                onCheckout={onCheckoutHandler}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
