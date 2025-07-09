'use client'
import { useState, useEffect} from "react";
import EditProfileButton from "@/components/profile/edit-profile-button";
import ProfileSettings from "@/components/settings/profile";
import {getProfileById} from "@/lib/supabase/queries/get-profile";

export default function EditProfileDialog({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfileById(userId);
      if (profile) setAvatarUrl(profile.avatar_url);
    };
    if (open) fetchProfile();
  }, [open, userId]);

  return (
    <>
      <EditProfileButton onClick={() => setOpen(true)} />
      <ProfileSettings
        open={open}
        onClose={() => setOpen(false)}
        userId={userId}
        avatarUrl={avatarUrl}
      />
    </>
  );
}