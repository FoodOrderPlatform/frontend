import { useGetUser, useUpdateUser } from "@/api/UserApi";
import UserProfile from "@/forms/user-profile-form/UserProfile";

export default function UserProfilePage() {
  const { currentUser, isLoading: isGetLoading } = useGetUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();

  if (isGetLoading) {
    return null; // add spiner loading later
  }

  if (!currentUser) {
    return <span>Uanable to load user profile.</span>;
  }
  return (
    <>
      <UserProfile
        currentUser={currentUser}
        onSave={updateUser}
        isLoading={isUpdateLoading}
      />
    </>
  );
}
