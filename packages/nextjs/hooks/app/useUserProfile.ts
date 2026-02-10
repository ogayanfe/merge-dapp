import { useEffect, useState } from "react";

export interface UserProfile {
  name: string;
  bio: string;
  skills: string[];
  socials: {
    github: string;
    twitter: string;
    telegram: string;
  };
}

const DEFAULT_PROFILE: UserProfile = {
  name: "",
  bio: "",
  skills: [],
  socials: {
    github: "",
    twitter: "",
    telegram: "",
  },
};

export const useUserProfile = (address: string | undefined) => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    if (!address) return;
    const stored = localStorage.getItem(`user-profile-${address}`);
    if (stored) {
      setProfile(JSON.parse(stored));
    } else {
      setProfile(DEFAULT_PROFILE);
    }
  }, [address]);

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    if (!address) return;
    const updated = { ...profile, ...newProfile };
    setProfile(updated);
    localStorage.setItem(`user-profile-${address}`, JSON.stringify(updated));
  };

  return { profile, updateProfile };
};
