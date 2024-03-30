import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function MobileNavLink() {
  const { logout } = useAuth0();
  return (
    <div className="flex flex-1 flex-col items-center gap-2 text-center">
      <Link
        to="user-profile"
        className="w-full p-2 text-xl hover:bg-slate-200 hover:text-primary"
      >
        User profile
      </Link>
      <Button className="w-full" onClick={() => logout()}>
        Log out
      </Button>
    </div>
  );
}
