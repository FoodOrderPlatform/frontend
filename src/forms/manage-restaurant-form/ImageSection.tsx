import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import React from "react";

export default function ImageSection() {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight"> Image</h2>
        <FormDescription>
          Add your image that will be displayed on your restaurant listing ini
          the search result. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>
      <div className="flex w-1/2 flex-col gap-8">
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white "
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null,
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
