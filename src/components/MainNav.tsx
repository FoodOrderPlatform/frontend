import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

export default function MainNav() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center gap-6">
          <Link
            to="/order-status"
            className="cursor-pointer font-bold hover:text-primary"
          >
            Orders status
          </Link>
          <UsernameMenu />
        </div>
      ) : (
        <Button
          variant="ghost"
          className="p-4 text-lg text-primary"
          onClick={async () => await loginWithRedirect()}
        >
          Log in
        </Button>
      )}
    </>
  );
}
