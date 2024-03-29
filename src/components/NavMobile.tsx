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
import { useAuth0 } from "@auth0/auth0-react";

export default function NavMobile() {
  const { loginWithRedirect } = useAuth0();
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
              <Button
                type="submit"
                className="w-full"
                onClick={async () => await loginWithRedirect()}
              >
                Log in
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
