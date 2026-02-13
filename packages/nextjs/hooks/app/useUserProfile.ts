import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { notification } from "~~/utils/scaffold-eth";
import { UserProfile, createUser, getUser, updateUser } from "~~/utils/superbase/user";

const DEFAULT_PROFILE: UserProfile = {
  display_name: "",
  bio: "",
  skills: [],
  socials: [],
};

export const useUserProfile = (address: string | undefined) => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [exists, setExists] = useState(false);
  const { address: connectedAddress } = useAccount();

  useEffect(() => {
    if (!address) return;

    (async () => {
      const { data: Users } = await getUser(address);

      if (!Users || Users?.length == 0) {
        setExists(false);
        return;
      }

      setExists(true);
      setProfile(Users[0] as unknown as UserProfile);
    })();
  }, [address]);

  async function updateProfile(newProfile: Partial<UserProfile>) {
    if (!address || !connectedAddress || address != connectedAddress) return;

    const updated = { ...profile, ...newProfile };

    const id = notification.loading("Updating profile");

    try {
      if (exists) {
        await updateUser(address, updated);
      } else {
        await createUser(address, updated);
      }
      notification.success("Profile updated successfully");
      setProfile(updated);
    } catch {
      notification.error("Error updating profile. Try refreshing page");
    }

    notification.remove(id);
  }

  return { profile, updateProfile, exists };
};
