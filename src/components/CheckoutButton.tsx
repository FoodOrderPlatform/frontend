import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { useLocation } from "react-router-dom";

export default function CheckoutButton() {
  const { pathname } = useLocation();
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };
  if (isLoading) {
    return <LoadingButton />;
  }
  if (!isAuthenticated) {
    return (
      <Button className="flex-1" onClick={onLogin}>
        Log in to checkout
      </Button>
    );
  }
  return <Button className="flex-1">Go to checkout</Button>;
}
