import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

export default function SearchResultInfo({ total, city }: Props) {
  return (
    <div className="flex flex-col justify-between gap-3 text-xl font-bold lg:flex-row lg:items-center">
      <span>
        {total} Restaurants found in {city}{" "}
        <Link
          to="/"
          className="cursor-pointer text-sm font-semibold text-blue-700 underline"
        >
          Change location
        </Link>
      </span>
      <div>Dropdown sort option</div>
    </div>
  );
}
