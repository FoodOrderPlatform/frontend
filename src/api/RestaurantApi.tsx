import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getRestaurantRequest = async () => {
    const access_token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get Restaurant");
    }
    return response.json();
  };
  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery("fetchRestaurant", getRestaurantRequest);
  if (error) {
    toast.error(error.toString());
  }
  return {
    restaurant,
    isLoading,
  };
};
export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createRestaurantRequest = async (
    restaurantFormData: FormData,
  ): Promise<Restaurant> => {
    const access_token = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }
    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createRestaurantRequest);
  if (isSuccess) {
    toast.success("Restaurant created!");
  }
  if (error) {
    toast.error("Unable to update restaurant");
  }
  return {
    createRestaurant,
    isLoading,
  };
};
