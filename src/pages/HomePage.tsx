import SearchBar, { SearchForm } from "@/components/Searchbar";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="my-4 flex flex-col items-center gap-12">
      <div className="-mt-12 flex w-fit min-w-[70vw] flex-col items-center gap-6 rounded-lg bg-white p-8 text-center shadow-md drop-shadow-md">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Tuck into a takeway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
        <SearchBar
          placeholder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>
    </div>
  );
}
