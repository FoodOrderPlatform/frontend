import { useSearchRestaurants } from "@/api/RestauransApi";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city);

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  if (!results?.data || !city) {
    return <p>No results found</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 p-10 lg:grid-cols-[250px_1fr]">
      <div id="cuisinse-list">intert cuisines here :)</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchResultInfo city={city} total={results.pagination.total} />
        {results.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
