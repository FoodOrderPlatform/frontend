import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};
const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const onResetFilterHandler = () => {
    onChange([]);
  };
  const onCuisinesChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;
    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisinesList);
  };
  return (
    <>
      <div className="flex items-center justify-between px-2">
        <div className="mb-2 text-base font-semibold">Filter by Cuisines</div>
        <div
          className="cursor-pointer text-sm font-semibold tracking-tight underline"
          onClick={onResetFilterHandler}
        >
          Reset filter
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div>
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={onCuisinesChangeHandler}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 cursor-pointer items-center rounded-full px-4 py-2 text-sm font-semibold ${isSelected ? "border border-green-700 text-green-700" : "border border-slate-300"}`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button
          variant="link"
          className="mt-4 flex-1"
          onClick={onExpandedClick}
        >
          <span className="flex items-center gap-1">
            {isExpanded ? "View less" : "View more"}
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </span>
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
