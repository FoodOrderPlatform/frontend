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
import { CircleUserRound, Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavMobile() {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>

        <SheetContent className="space-y-4">
          {isAuthenticated ? (
            <SheetHeader>
              <SheetTitle className="flex items-center gap-x-2">
                <CircleUserRound className="text-primary" />
                <span className="hover-primary font-bold">{user?.email}</span>
              </SheetTitle>
            </SheetHeader>
          ) : (
            <SheetHeader>
              <SheetTitle>Welcome to Food Ordering Platform</SheetTitle>
              <SheetDescription>
                Login to discorvery our platfom
              </SheetDescription>
            </SheetHeader>
          )}

          <Separator />
          <SheetFooter>
            <SheetClose asChild>
              {isAuthenticated ? (
                <Button className="w-full" onClick={() => logout()}>
                  Log out
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={async () => await loginWithRedirect()}
                >
                  Log in
                </Button>
              )}
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
