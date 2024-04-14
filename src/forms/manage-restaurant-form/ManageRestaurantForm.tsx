import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "restaurant name is required field",
  }),
  city: z.string({
    required_error: "city is required field",
  }),
  country: z.string({
    required_error: "country is required field",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is required field",
    invalid_type_error: "must be a positive number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "estimated delivery time is required field",
    invalid_type_error: "must be a positive number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "please select at least one item",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number().min(1, "price is required"),
    }),
  ),
  imageFile: z.instanceof(File, { message: "image is required field" }),
});

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};
export default function ManageRestaurantForm({ onSave, isLoading }: Props) {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [
        {
          name: "",
          price: 0,
        },
      ],
    },
  });
  const onSubmit = (formDataJson: restaurantFormData) => {
    console.log(formDataJson);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 rounded-md bg-background p-10"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="w-fit self-end">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}
