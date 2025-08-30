'use client'
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import EditProfileDialog from "@/components/profile/edit-profile-dialog";
import FollowButton from "@/components/ui/follow-button";

export default function ProfileActionButton({ profileId }: { profileId: string }) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, []);

  if (!userId) return null; // Not logged in or still loading

  if (userId === profileId) {
    return <EditProfileDialog userId={userId} />;
  } else {
    return <FollowButton userId={profileId} />;
  }
}