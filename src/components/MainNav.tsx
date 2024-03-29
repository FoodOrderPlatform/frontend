import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

export default function MainNav() {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <Button
        variant="ghost"
        className="p-4 text-lg text-primary"
        onClick={async () => await loginWithRedirect()}
      >
        Log in
      </Button>
    </>
  );
}
