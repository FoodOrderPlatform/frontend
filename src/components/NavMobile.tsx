import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Separator } from "./ui/separator";

export default function NavMobile() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>

        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Welcome to Food Ordering Platform</SheetTitle>
            <SheetDescription>Login to discorvery our platfom</SheetDescription>
          </SheetHeader>
          <Separator />
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
