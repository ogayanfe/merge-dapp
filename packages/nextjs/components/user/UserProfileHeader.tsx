import React, { useState } from "react";
import { Address } from "@scaffold-ui/components";
import { useAccount } from "wagmi";
import { CheckIcon, PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useUserProfile } from "~~/hooks/app/useUserProfile";
import { getSocialIcon } from "~~/utils/socialIcons";

interface UserProfileHeaderProps {
  address: string;
  isEditable?: boolean;
}

export const UserProfileHeader = ({ address, isEditable = false }: UserProfileHeaderProps) => {
  const { profile, updateProfile } = useUserProfile(address);
  const [isEditing, setIsEditing] = useState(false);
  const { address: connectedAddress } = useAccount();

  // Local state for edit mode
  const [editName, setEditName] = useState(profile.display_name);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editSkills, setEditSkills] = useState(profile.skills.join(", "));
  const [editSocials, setEditSocials] = useState<[string, string][]>(profile.socials || []);

  // Sync state when profile loads
  React.useEffect(() => {
    setEditName(profile.display_name);
    setEditBio(profile.bio);
    setEditSkills(profile.skills.join(", "));
    setEditSocials(profile.socials || []);
  }, [profile]);

  const handleSave = () => {
    const skills = editSkills
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    // Filter out empty socials
    const cleanSocials = editSocials.filter(([k, v]) => k && v);

    updateProfile({
      display_name: editName,
      bio: editBio,
      skills,
      socials: cleanSocials,
    });
    setIsEditing(false);
  };

  const handleAddSocial = () => {
    setEditSocials([...editSocials, ["", ""]]);
  };

  const handleSocialChange = (index: number, key: string, value: string) => {
    const newSocials = [...editSocials];
    newSocials[index] = [key, value];
    setEditSocials(newSocials);
  };

  const handleRemoveSocial = (index: number) => {
    const newSocials = [...editSocials];
    newSocials.splice(index, 1);
    setEditSocials(newSocials);
  };

  // Helper to extract image from socials
  const profileImage = profile.socials?.find(([k]) => k === "image")?.[1];

  return (
    <section className="flex flex-col md:flex-row items-start md:items-center gap-6 border-b border-base-300 pb-8 relative">
      <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center border-2 border-primary/20 shrink-0 overflow-hidden relative">
        {profileImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <UserCircleIcon className="w-12 h-12 opacity-50" />
        )}
      </div>

      <div className="flex-1 w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-10">
            {isEditing ? (
              <input
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="bg-base-200 border border-base-300 p-1 text-2xl font-black uppercase tracking-tighter w-full max-w-xs focus:outline-none focus:border-primary"
                placeholder="SET DISPLAY NAME"
              />
            ) : (
              <h1 className="text-3xl font-black uppercase tracking-tighter">
                {profile.display_name || "Anonymous User"}
              </h1>
            )}

            <span className="bg-base-200 px-2 py-1 text-[10px] font-black uppercase rounded-sm border border-base-300">
              <Address address={address} />
            </span>
          </div>

          {isEditable && connectedAddress?.toLowerCase() === address.toLowerCase() && (
            <button onClick={isEditing ? handleSave : () => setIsEditing(true)} className="btn btn-sm btn-ghost">
              {isEditing ? (
                <CheckIcon className="h-4 w-4 text-success" />
              ) : (
                <PencilSquareIcon className="h-4 w-4 opacity-50" />
              )}
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={editBio}
              onChange={e => setEditBio(e.target.value)}
              className="w-full bg-base-200 border border-base-300 p-2 text-xs font-mono focus:outline-none focus:border-primary h-20"
              placeholder="WRITE A SHORT BIO..."
            />
            <input
              value={editSkills}
              onChange={e => setEditSkills(e.target.value)}
              className="w-full bg-base-200 border border-base-300 p-2 text-xs font-mono focus:outline-none focus:border-primary"
              placeholder="SKILLS (COMMA SEPARATED)..."
            />

            <div className="space-y-2 border-t border-base-300 pt-4">
              <h4 className="text-[10px] font-black uppercase opacity-50 mb-2">Social Links & Image</h4>
              {editSocials.map((social, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    value={social[0]}
                    onChange={e => handleSocialChange(index, e.target.value, social[1])}
                    placeholder="KEY (e.g. twitter, image)"
                    className="w-1/4 bg-base-200 border border-base-300 p-2 text-xs font-mono focus:outline-none focus:border-primary"
                  />
                  <input
                    value={social[1]}
                    onChange={e => handleSocialChange(index, social[0], e.target.value)}
                    placeholder="URL"
                    className="flex-1 bg-base-200 border border-base-300 p-2 text-xs font-mono focus:outline-none focus:border-primary"
                  />
                  <button onClick={() => handleRemoveSocial(index)} className="btn btn-xs btn-ghost text-error">
                    X
                  </button>
                </div>
              ))}
              <button onClick={handleAddSocial} className="btn btn-xs btn-ghost text-[10px] font-black uppercase">
                + Add Social / Image
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs font-mono opacity-60 max-w-2xl leading-relaxed">
              {profile.bio || "No bio provided."}
            </p>
            {profile.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-sm border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Social Links Display */}
            {profile.socials && profile.socials.length > 0 && (
              <div className="flex items-center gap-4 pt-2">
                {profile.socials
                  .filter(([k]) => k !== "image") // Don't show image url in list
                  .map(([key, url], i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity hover:text-primary"
                    >
                      {getSocialIcon(key)}
                    </a>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
