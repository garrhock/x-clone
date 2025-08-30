import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";
import { RiCameraAiLine } from "react-icons/ri";
import Text from "@/components/text";
import ProfilePicture from "@/components/ui/avatar";
import Banner from "../ui/profile-banner";
import { getProfileById} from "@/lib/supabase/queries";

interface ProfileSettingsProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  avatarUrl: string;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  open,
  onClose,
  userId,
  avatarUrl,
}) => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [personalWebsiteLink, setPersonalWebsiteLink] = useState("");
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [avatarUrlState, setAvatarUrl] = useState<string>(avatarUrl || "");

  // pending uploads (local preview until save)
  const [pendingBanner, setPendingBanner] = useState<File | null>(null);
  const [pendingBannerPreview, setPendingBannerPreview] = useState<string>("");

  const [pendingAvatar, setPendingAvatar] = useState<File | null>(null);
  const [pendingAvatarPreview, setPendingAvatarPreview] = useState<string>("");

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

  useEffect(() => {
    setAvatarUrl(avatarUrl || "");
  }, [avatarUrl]);

  const handleClose = () => {
    onClose();
    router.push(`/profile-page/${userId}`);
  };

  const handleSave = async () => {
    const supabase = createClient();
    let newBannerUrl = bannerUrl;
    let newAvatarUrl = avatarUrlState;

    // Upload banner if a new one was selected
    if (pendingBanner) {
      const fileName = `${userId}/banner-${Date.now()}-${pendingBanner.name}`;
      const { data, error } = await supabase.storage
        .from("profile-banner")
        .upload(fileName, pendingBanner, { cacheControl: "3600", upsert: true });

      if (error) {
        console.error("Error uploading banner:", error.message);
      } else if (data) {
        const { data: publicUrlData } = supabase.storage
          .from("profile-banner")
          .getPublicUrl(data.path);
        newBannerUrl = publicUrlData.publicUrl;
      }
    }

    // Upload avatar if a new one was selected
    if (pendingAvatar) {
      const fileName = `${userId}/profile-${Date.now()}-${pendingAvatar.name}`;
      const { data, error } = await supabase.storage
        .from("profile-picture")
        .upload(fileName, pendingAvatar, { cacheControl: "3600", upsert: true });

      if (error) {
        console.error("Error uploading avatar:", error.message);
      } else if (data) {
        const { data: publicUrlData } = supabase.storage
          .from("profile-picture")
          .getPublicUrl(data.path);
        newAvatarUrl = publicUrlData.publicUrl;
      }
    }

    // Update profile row with new URLs (and other fields)
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        bio,
        location,
        personal_website_link: personalWebsiteLink,
        banner_url: newBannerUrl,
        avatar_url: newAvatarUrl,
      })
      .eq("id", userId);

    if (updateError) {
      console.error("Error updating profile:", updateError.message);
      alert("Failed to update profile.");
    } else {
      alert("Profile updated successfully!");
      setBannerUrl(newBannerUrl);
      setAvatarUrl(newAvatarUrl);
      setPendingBanner(null);
      setPendingAvatar(null);
      setPendingBannerPreview("");
      setPendingAvatarPreview("");
      onClose();
      router.push(`/profile-page/${userId}`);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingBanner(file);
    setPendingBannerPreview(URL.createObjectURL(file));
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingAvatar(file);
    setPendingAvatarPreview(URL.createObjectURL(file));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="min-w-[600px] min-h-[400px] w-[600px] h-[650px] bg-background border border-border rounded-2xl overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="sticky top-0">
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
              {pendingBannerPreview ? (
                <img
                  src={pendingBannerPreview}
                  alt="Banner preview"
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
              ) : (
                <Banner userId={userId} />
              )}
              <label
                htmlFor="banner-upload"
                className="absolute inset-0 flex items-center justify-center bg-background/10 hover:bg-background/50 text-white rounded-full cursor-pointer"
                style={{ width: "48px", height: "48px", margin: "auto" }}
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

            {/* Avatar */}
            <div className="sticky flex pt-3 px-4 mb-4 w-full items-start pb-[60px]">
              <div className="mt-[-55px] relative">
                <label
                  htmlFor="profile-picture-upload"
                  className="absolute top-[60px] left-10 bg-background/10 hover:bg-background/50 text-white rounded-full p-2 flex items-center justify-center cursor-pointer z-30"
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
                <ProfilePicture
                  userId={userId}
                  avatarUrl={pendingAvatarPreview || avatarUrlState}
                  size="md"
                />
              </div>
            </div>

            {/* Fields */}
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
