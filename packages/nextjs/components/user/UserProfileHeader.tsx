import React, { useState } from "react";
import { Address } from "@scaffold-ui/components";
import { CheckIcon, PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useUserProfile } from "~~/hooks/app/useUserProfile";

interface UserProfileHeaderProps {
  address: string;
  isEditable?: boolean;
}

export const UserProfileHeader = ({ address, isEditable = false }: UserProfileHeaderProps) => {
  const { profile, updateProfile } = useUserProfile(address);
  const [isEditing, setIsEditing] = useState(false);

  // Local state for edit mode
  const [editName, setEditName] = useState(profile.name);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editSkills, setEditSkills] = useState(profile.skills.join(", "));

  // Sync state when profile loads
  React.useEffect(() => {
    setEditName(profile.name);
    setEditBio(profile.bio);
    setEditSkills(profile.skills.join(", "));
  }, [profile]);

  const handleSave = () => {
    updateProfile({
      name: editName,
      bio: editBio,
      skills: editSkills
        .split(",")
        .map(s => s.trim())
        .filter(Boolean),
    });
    setIsEditing(false);
  };

  return (
    <section className="flex flex-col md:flex-row items-start md:items-center gap-6 border-b border-base-300 pb-8 relative">
      <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center border-2 border-primary/20 shrink-0">
        <UserCircleIcon className="w-12 h-12 opacity-50" />
      </div>

      <div className="flex-1 w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            {isEditing ? (
              <input
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="bg-base-200 border border-base-300 p-1 text-2xl font-black uppercase tracking-tighter w-full max-w-xs focus:outline-none focus:border-primary"
                placeholder="SET DISPLAY NAME"
              />
            ) : (
              <h1 className="text-3xl font-black uppercase tracking-tighter">{profile.name || "Anonymous User"}</h1>
            )}

            <span className="bg-base-200 px-2 py-1 text-[10px] font-black uppercase rounded-sm border border-base-300">
              <Address address={address} />
            </span>
          </div>

          {isEditable && (
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
          <div className="space-y-2">
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
          </div>
        )}
      </div>
    </section>
  );
};
