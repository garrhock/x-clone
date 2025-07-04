'use client'
import { useState } from "react";
import EditProfileButton from "@/components/profile/edit-profile-button";
import ProfileSettings from "@/components/settings/profile";

export default function EditProfileDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <EditProfileButton onClick={() => setOpen(true)} />
      <ProfileSettings open={open} onClose={() => setOpen(false)} />
    </>
  );
}