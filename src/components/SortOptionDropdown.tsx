import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Delivery price",
    value: "deliveryPrice",
  },

  {
    label: "Estimated delivery time",
    value: "estimatedDeliveryTime",
  },
];
type Props = {
  onChange: (sortOption: string) => void;
  sortOption: string;
};

export function SortOptionDropdown({ onChange, sortOption }: Props) {
  const currentSortIndex = SORT_OPTIONS.findIndex(
    (item) => item.value === sortOption,
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="cursor-pointer" variant="outline">
          Sort by: {SORT_OPTIONS[currentSortIndex].label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((item) => (
          <DropdownMenuItem
            key={item.value}
            className="cursor-pointer"
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
