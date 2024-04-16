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
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z
  .object({
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
    imageUrl: z.string().optional(),
    imageFile: z
      .instanceof(File, { message: "image is required field" })
      .optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image Url or image File must be provided",
  });

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};
export default function ManageRestaurantForm({
  restaurant,
  onSave,
  isLoading,
}: Props) {
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
  useEffect(() => {
    if (!restaurant) {
      return;
    }
    const formatedDeliveryPrice = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2),
    );

    const formatedMenuItems = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: formatedDeliveryPrice,
      menuItems: formatedMenuItems,
    };
    form.reset(updatedRestaurant);
  }, [restaurant]);

  const onSubmit = (formDataJson: restaurantFormData) => {
    // TODO - convert formDataJson to a new FormData restaurant - all to string
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString(),
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString(),
    );

    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString(),
      );
    });
    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }

    onSave(formData);
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
