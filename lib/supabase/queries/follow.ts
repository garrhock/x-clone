import { createClient } from "@/lib/supabase/client";

// Follow a user
export async function followUser(followerId: string, followingId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("follows")
    .insert([{ follower_id: followerId, following_id: followingId }]);
  return error;
}

// Unfollow a user
export async function unfollowUser(followerId: string, followingId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", followingId);
  return error;
}

// Count followers
export async function countFollowers(userId: string) {
  const supabase = createClient();
  const { count } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", userId);
  return count || 0;
}

// Count following
export async function countFollowing(userId: string) {
  const supabase = createClient();
  const { count } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", userId);
  return count || 0;
}