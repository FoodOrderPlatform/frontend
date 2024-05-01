import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  searchQuery?: string;
  onSubmit: (formData: SearchForm) => void;
  placeholder: string;
  onReset?: () => void;
};

export default function SearchBar({
  onSubmit,
  onReset,
  placeholder,
  searchQuery,
}: Props) {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({
      searchQuery,
    });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex flex-row items-center justify-between gap-2 rounded-full border-2 p-2 ${form.formState.errors.searchQuery && "border-red-700"}`}
      >
        <Search className="hidden text-primary md:block" />

        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none focus-visible:ring-0"
                  placeholder={placeholder}
                />
              </FormControl>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />

        <Button
          onClick={handleReset}
          variant="outline"
          type="button"
          className="rounded-full"
        >
          Reset
        </Button>

        <Button type="submit" className="rounded-full">
          Search
        </Button>
      </form>
    </Form>
  );
}
