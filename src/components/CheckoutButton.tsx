import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import UserProfile, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfile";
import { useGetUser } from "@/api/UserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disable: boolean;
  isLoading: boolean;
};
export default function CheckoutButton({
  onCheckout,
  disable,
  isLoading,
}: Props) {
  const { pathname } = useLocation();
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();
  const { currentUser, isLoading: isUserLoading } = useGetUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };
  if (isLoading || isAuthLoading) {
    return <LoadingButton />;
  }
  if (!isAuthenticated || !currentUser) {
    return (
      <Button className="flex-1" onClick={onLogin}>
        Log in to checkout
      </Button>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disable} className="flex-1">
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full p-8 md:min-w-[700px]">
        <UserProfile
          currentUser={currentUser}
          isLoading={isUserLoading}
          onSave={onCheckout}
          title="Confirm delivery details"
          textButton="Countinue to payment"
        />
      </DialogContent>
    </Dialog>
  );
}
