import { createClient } from "@/lib/supabase/client";

export async function getProfileById(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<{ full_name: string; avatar_url: string; bio: string }>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function uploadProfilePicture(userId: string, file: File) {
  const supabase = createClient();
  const fileName = `${userId}/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("profile-pictures")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Error uploading profile picture:", error.message);
    return null;
  }

  // Get the public URL of the uploaded file
  const { data: publicUrlData } = supabase.storage
    .from("profile-pictures")
    .getPublicUrl(fileName);

  return publicUrlData?.publicUrl;
}

export async function updateProfilePicture(userId: string, avatarUrl: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", userId);

  if (error) {
    console.error("Error updating profile picture:", error.message);
  }
}