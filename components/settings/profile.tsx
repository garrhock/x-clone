import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";
import { RiCameraAiLine } from "react-icons/ri";
import Text from "@/components/text";
import ProfilePicture from "@/components/profile/avatar";
import Banner from "../profile/profile-banner";
import { getProfileById } from "@/lib/supabase/queries/get-profile";

interface ProfileSettingsProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  avatarUrl: string;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ open, onClose, userId, avatarUrl }) => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [personalWebsiteLink, setPersonalWebsiteLink] = useState("");
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [avatarUrlState, setAvatarUrl] = useState<string>(avatarUrl || "");

  useEffect(() => {
    if (!open) return;

    const fetchProfile = async () => {
      try {
        const profile = await getProfileById(userId);
        if (profile) {
          setFullName(profile.full_name || "");
          setBio(profile.bio || "");
          setLocation(profile.location || "");
          setPersonalWebsiteLink(profile.personal_website_link || "");
          setBannerUrl(profile.banner_url || "");
          setAvatarUrl(profile.avatar_url || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [open, userId]);

  // Update avatarUrlState if the avatarUrl prop changes
  useEffect(() => {
    setAvatarUrl(avatarUrl || "");
  }, [avatarUrl]);

  const handleClose = () => {
    onClose();
    router.push(`/profile/${userId}`);
  };

  const handleSave = async () => {
    const supabase = createClient();

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        bio,
        location,
        personal_website_link: personalWebsiteLink,
      })
      .eq("id", userId);

    if (!error) {
      alert("Profile updated successfully!");
      onClose();
      router.push(`/profile/${userId}`);
    } else {
      alert("Failed to update profile.");
    }
  };

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const supabase = createClient();
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = `${userId}/banner-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("banners")
      .upload(fileName, file, { cacheControl: "3600", upsert: true });

    if (error) {
      console.error("Error uploading banner:", error);
      alert("Failed to upload banner.");
      return;
    }

    const { data: publicUrlData } = supabase.storage.from("banners").getPublicUrl(fileName);
    if (publicUrlData?.publicUrl) {
      await supabase
        .from("profiles")
        .update({ banner_url: publicUrlData.publicUrl })
        .eq("id", userId);

      setBannerUrl(publicUrlData.publicUrl);
      alert("Banner updated successfully!");
    }
  };

  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const supabase = createClient();
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = `${userId}/profile-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, { cacheControl: "3600", upsert: true });

    if (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture.");
      return;
    }

    const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
    if (publicUrlData?.publicUrl) {
      await supabase
        .from("profiles")
        .update({ avatar_url: publicUrlData.publicUrl })
        .eq("id", userId);

      setAvatarUrl(publicUrlData.publicUrl);
      alert("Profile picture updated successfully!");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="min-w-[600px] min-h-[400px] w-[600px] h-[650px] bg-background border border-border rounded-2xl overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="sticky top-0 z-2">
            <div className="flex flex-row items-center justify-between h-[53px] px-4">
              <button
                className="rounded-full hover:bg-foreground/10 transition-colors duration-200 min-w-[36px] min-h-[36px] flex items-center justify-center"
                onClick={handleClose}
                aria-label="Close"
              >
                <IoCloseOutline className="size-6 align-middle" />
              </button>
              <Text variant="heading" color="foreground">
                Edit profile
              </Text>
              <button
                className="bg-foreground cursor-pointer px-[16px] min-h-[32px] min-w-[32px] border-transparent rounded-full"
                onClick={handleSave}
              >
                <span className="text-background">Save</span>
              </button>
            </div>
          </div>
          {/* Content */}
          <div className="flex flex-col pb-16">
            {/* Banner */}
            <div className="relative">
              <Banner userId={userId} />
              <label
                htmlFor="banner-upload"
                className="absolute top-4 right-4 bg-gray-500 hover:bg-gray-600 text-white rounded-full p-2 flex items-center justify-center cursor-pointer"
              >
                <RiCameraAiLine className="w-6 h-6" />
              </label>
              <input
                type="file"
                id="banner-upload"
                accept="image/*"
                className="hidden"
                onChange={handleBannerChange}
              />
            </div>
            {/* Info */}
            <div className="sticky flex pt-3 px-4 mb-4 w-full items-start pb-[60px]">
              <div className="mt-[-55px] z-10 relative">
                <ProfilePicture userId={userId} avatarUrl={avatarUrlState} size="md" />
                <label
                  htmlFor="profile-picture-upload"
                  className="absolute top-[60px] left-10 bg-gray-500 hover:bg-gray-600 text-white rounded-full p-2 flex items-center justify-center cursor-pointer"
                  style={{ transform: "translateY(-50%)" }}
                >
                  <RiCameraAiLine className="w-6 h-6" />
                </label>
                <input
                  type="file"
                  id="profile-picture-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
              </div>
            </div>
            <div className="mx-4 flex flex-col">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="border border-border bg-transparent h-16 rounded p-2 mb-7"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
                className="border border-border bg-transparent h-32 rounded p-2 mb-7"
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="border border-border bg-transparent h-16 rounded p-2 mb-7"
              />
              <input
                type="text"
                value={personalWebsiteLink}
                onChange={(e) => setPersonalWebsiteLink(e.target.value)}
                placeholder="Website"
                className="border border-border bg-transparent h-16 rounded p-2 mb-7"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;