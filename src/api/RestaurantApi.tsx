import { Order, OrderStatus, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getRestaurantRequest = async (): Promise<Restaurant> => {
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
    toast.error("Unable to create restaurant");
  }
  return {
    createRestaurant,
    isLoading,
  };
};

export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateRestaurantRequest = async (
    restaurantFormData: FormData,
  ): Promise<Restaurant> => {
    const access_token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: restaurantFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }
    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateRestaurantRequest);

  if (error) {
    toast.error(error.toString());
  }
  if (isSuccess) {
    toast.success("Success to update restaurant");
  }
  return {
    updateRestaurant,
    isLoading,
  };
};

export const useGetRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestaurantOrderRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Faile to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "getRestaurantOrder",
    getRestaurantOrderRequest,
  );

  return {
    orders,
    isLoading,
  };
};

type UpdateRestaurantOrderRequest = {
  orderId: string;
  newStatus: OrderStatus;
};
export const useUpdateRestaurantOrderState = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantOrder = async (
    updateRestaurantOrderRequest: UpdateRestaurantOrderRequest,
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/order/${updateRestaurantOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: updateRestaurantOrderRequest.newStatus,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Faile to update order status");
    }

    return response.json();
  };

  const {
    mutateAsync: updatedOrder,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(updateRestaurantOrder);

  if (isError) {
    toast.error("Unable to update order");
  }

  if (isSuccess) {
    toast.success("Order updated");
  }

  return {
    updatedOrder,
    isLoading,
  };
};
