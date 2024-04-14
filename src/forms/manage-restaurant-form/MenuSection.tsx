import { FormDescription, FormItem, FormField } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";
import { Button } from "@/components/ui/button";

export default function MenuSection() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Menu</h2>
        <FormDescription>
          Create your menu and give each item a name and a price
        </FormDescription>
      </div>
      <div>
        <FormField
          control={control}
          name="menuItems"
          render={() => (
            <FormItem className="flex flex-col gap-2">
              {fields.map((_, index) => (
                <MenuItemInput
                  key={index}
                  index={index}
                  removeItem={() => remove(index)}
                />
              ))}
            </FormItem>
          )}
        />
      </div>
      <Button
        type="button"
        onClick={() =>
          append({
            name: "",
            price: "",
          })
        }
      >
        Add menu item
      </Button>
    </div>
  );
}
