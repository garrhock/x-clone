import { createClient } from "@/lib/supabase/client";
import type { Post } from "@/lib/supabase/types";
const supabase = createClient();


export async function fetchPosts(): Promise<Post[]> {

  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles:profiles!posts_user_id_fkey(*)")
    .is("parent_id", null)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (
    (data || []).map((post: any) => ({
      ...post,
      // Normalize embedded profile to a single object (handle array/object)
      profiles: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles,
    })) as Post[]
  );
}

export async function fetchPostsByUser(userId: string): Promise<Post[]> {

  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles:profiles!posts_user_id_fkey(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (
    (data || []).map((post: any) => ({
      ...post,
      profiles: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles,
    })) as Post[]
  );
}


export async function getPostStats(postId: string) {
  

  const [{ count: likes }, { count: comments }, { count: reposts }, { count: views }] = await Promise.all([
    supabase.from("likes").select("*", { count: "exact", head: true }).eq("post_id", postId),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("parent_id", postId),
    supabase.from("reposts").select("*", { count: "exact", head: true }).eq("post_id", postId),
    supabase.from("views").select("*", { count: "exact", head: true }).eq("post_id", postId),
  ]);

  return {
    likes: likes || 0,
    comments: comments || 0,
    reposts: reposts || 0,
    views: views || 0,
  };
}

export async function getProfileById(userId: string) {
  
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<{ full_name: string; avatar_url: string; bio: string }>) {
  
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function uploadProfilePicture(userId: string, file: File) {
  
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
  
  const { error } = await supabase
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", userId);

  if (error) {
    console.error("Error updating profile picture:", error.message);
  }
}

// Follow a user
export async function followUser(followerId: string, followingId: string) {
  
  const { error } = await supabase
    .from("follows")
    .insert([{ follower_id: followerId, following_id: followingId }]);
  return error;
}

// Unfollow a user
export async function unfollowUser(followerId: string, followingId: string) {
  
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", followingId);
  return error;
}

// Count followers
export async function countFollowers(userId: string) {
  
  const { count } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", userId);
  return count || 0;
}

// Count following
export async function countFollowing(userId: string) {
  
  const { count } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", userId);
  return count || 0;
}

export async function countPosts(userId: string): Promise<number> {
    
    const { count, error } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) {
    console.error("Error counting posts:", error.message);
    return 0;
  }

  return count || 0;
}

export async function getPostById(postId: string) {
  return await supabase
    .from('posts')
    .select('*, profiles:profiles!posts_user_id_fkey(*)')
    .eq('id', postId)
    .single()
    .then(({ data }) => data);
}

export async function getPostReplies(postId: string) {
  return await supabase
    .from("posts")
    .select("*, profiles:profiles!posts_user_id_fkey(*)")
    .eq("parent_id", postId)
    .order("created_at", { ascending: true })
    .then(({ data }) => data || []);
}


export async function addReply(userId: string, parentId: string, text: string) {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ user_id: userId, parent_id: parentId, text }])
    .select()
    .single();

  if (error) throw error;
  return data;
}
