'use client'
import { useState, useEffect} from "react";
import EditProfileButton from "@/components/ui/edit-profile-button";
import ProfileSettings from "@/components/settings/profile";
import { getProfileById } from "@/lib/supabase/queries.client";

export default function EditProfileDialog({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfileById(userId);
        if (profile) setAvatarUrl(profile.avatar_url);
      } catch (e) {
        console.error('Failed to load avatar url for edit profile dialog', e);
      }
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