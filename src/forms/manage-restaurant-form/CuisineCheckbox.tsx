import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

export default function CuisineItem({ cuisine, field }: Props) {
  return (
    <FormItem className="mt-2 flex flex-row items-center space-x-2 space-y-0">
      <FormControl>
        <Checkbox
          className="bg-white "
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked: boolean) => {
            if (checked) {
              field.onChange([...field.value, cuisine]);
            } else {
              field.onChange(
                field.value.filter((item: string) => item !== cuisine),
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
}
