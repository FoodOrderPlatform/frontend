import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

export default function SearchResultCard({ restaurant }: Props) {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="group grid gap-5 lg:grid-cols-[2fr_3fr]"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 text-2xl font-bold tracking-tight group-hover:underline">
          {restaurant.restaurantName}
        </h3>

        <div id="card-content" className="grid gap-2 md:grid-cols-2">
          <div className="flex w-5/6 flex-wrap">
            {restaurant.cuisines.map((cuisine, index) => (
              <span key={index} className="flex">
                <span>{cuisine}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-green-700">
              <Clock className="text-green-700" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery from ${(restaurant.deliveryPrice / 100).toFixed()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
