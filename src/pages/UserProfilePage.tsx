import { useUpdateUser } from "@/api/UserApi";
import UserProfile from "@/forms/user-profile-form/UserProfile";

export default function UserProfilePage() {
  const { updateUser, isLoading } = useUpdateUser();
  return (
    <>
      <UserProfile onSave={updateUser} isLoading={isLoading} />
    </>
  );
}
