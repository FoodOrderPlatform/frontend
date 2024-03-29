import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Separator } from "@radix-ui/react-separator";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function UsernameMenu() {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row items-center justify-center space-x-2">
        <CircleUserRound className="text-primary" />
        <span className="text-xl font-semibold hover:text-primary">
          {user?.email}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex min-w-80 flex-1 flex-col gap-y-2 rounded-md bg-white p-4 text-center">
        <DropdownMenuItem className="text-md p-1 font-semibold hover:bg-slate-200  ">
          <Link to="/user-profile">User profile</Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button className="flex w-full" onClick={() => logout()}>
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
