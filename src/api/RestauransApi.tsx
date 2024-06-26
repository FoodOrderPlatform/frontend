import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestautant = (restaurantId?: string) => {
  const getRestaurentById = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurants/${restaurantId}`,
    );

    if (!response.ok) {
      throw new Error("Faile to get Restaurant info");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "getRestaurantById",
    getRestaurentById,
    {
      enabled: !!restaurantId,
    },
  );
  return {
    restaurant,
    isLoading,
  };
};
export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string,
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();

    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisinses", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurants/search/${city}?${params.toString()}`,
      {
        method: "GET",
      },
    );
    if (!response.ok) {
      throw new Error("Failed to get rertaurants");
    }
    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city },
  );
  return {
    results,
    isLoading,
  };
};
