import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateRestaurant,
} from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPage() {
  const { restaurant } = useGetRestaurant();
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateRestaurant();

  const isExisting: boolean = !!restaurant;
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isExisting ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
}
