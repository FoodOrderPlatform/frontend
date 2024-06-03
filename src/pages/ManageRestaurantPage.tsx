import {
  useCreateRestaurant,
  useGetRestaurant,
  useGetRestaurantOrder,
  useUpdateRestaurant,
} from "@/api/RestaurantApi";
import OrderCardDetails from "@/components/OrderCartDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPage() {
  const { restaurant } = useGetRestaurant();
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateRestaurant();

  const { orders } = useGetRestaurantOrder();

  const isExisting: boolean = !!restaurant;
  return (
    <Tabs defaultValue="order-status">
      <TabsList className="m-8 space-x-6 p-4">
        <TabsTrigger value="order-status">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="order-status"
        className="space-y-5 rounded-md bg-muted p-10"
      >
        <div className="text-2xl font-semibold">
          {orders?.length} active{" "}
          {orders && orders.length <= 1 ? "order" : "orders"}
        </div>
        {orders &&
          orders.map((order) => (
            <OrderCardDetails key={order._id} order={order} />
          ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isExisting ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
}
