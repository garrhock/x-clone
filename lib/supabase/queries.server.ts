import 'server-only';
import { createClient } from "@/lib/supabase/server";
import type { Post, Profile } from "@/lib/supabase/types";

export async function fetchPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles:profiles!posts_user_id_fkey(*)")
    .is("parent_id", null)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to fetch posts: ${error.message}`);

  return ((data || []).map((post: any) => ({
    ...post,
    profiles: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles,
  })) as Post[]);
}

export async function fetchPostsByUser(userId: string): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles:profiles!posts_user_id_fkey(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to fetch user's posts: ${error.message}`);

  return ((data || []).map((post: any) => ({
    ...post,
    profiles: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles,
  })) as Post[]);
}

export async function getPostStats(postId: string): Promise<{
  likes: number;
  comments: number;
  reposts: number;
  views: number;
}> {
  const supabase = await createClient();
  const results = await Promise.all([
    supabase.from("likes").select("*", { count: "exact", head: true }).eq("post_id", postId),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("parent_id", postId),
    supabase.from("reposts").select("*", { count: "exact", head: true }).eq("post_id", postId),
    supabase.from("views").select("*", { count: "exact", head: true }).eq("post_id", postId),
  ]);

  const [likesRes, commentsRes, repostsRes, viewsRes] = results as Array<{ count: number | null }>;
  return {
    likes: likesRes.count || 0,
    comments: commentsRes.count || 0,
    reposts: repostsRes.count || 0,
    views: viewsRes.count || 0,
  };
}

export async function getProfileById(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw new Error(`Failed to fetch profile: ${error.message}`);
  return data as Profile | null;
}

export async function updateProfile(
  userId: string,
  updates: Partial<{ full_name: string; avatar_url: string; bio: string; location: string; personal_website_link: string; banner_url: string }>,
): Promise<Profile> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select("*")
    .single();

  if (error) throw new Error(`Failed to update profile: ${error.message}`);
  return data as Profile;
}

export async function uploadProfilePicture(userId: string, file: File): Promise<string> {
  const supabase = await createClient();
  const fileName = `${userId}/profile-${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("profile-picture")
    .upload(fileName, file, { cacheControl: "3600", upsert: true });
  if (error) throw new Error(`Error uploading profile picture: ${error.message}`);
  const { data: publicUrlData } = supabase.storage.from("profile-picture").getPublicUrl(data?.path || fileName);
  const url = publicUrlData?.publicUrl;
  if (!url) throw new Error("Failed to get public URL for uploaded profile picture");
  return url;
}

export async function updateProfilePicture(userId: string, avatarUrl: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", userId);
  if (error) throw new Error(`Error updating profile picture: ${error.message}`);
}

export async function followUser(followerId: string, followingId: string): Promise<void> {
  if (!followerId) throw new Error("Follower id is required");
  if (!followingId) throw new Error("Following id is required");
  if (followerId === followingId) throw new Error("You cannot follow yourself");
  const supabase = await createClient();
  const { error } = await supabase
    .from("follows")
    .insert([{ follower_id: followerId, following_id: followingId }]);
  if (error) throw new Error(`Failed to follow user: ${error.message}`);
}

export async function unfollowUser(followerId: string, followingId: string): Promise<void> {
  if (!followerId) throw new Error("Follower id is required");
  if (!followingId) throw new Error("Following id is required");
  const supabase = await createClient();
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", followingId);
  if (error) throw new Error(`Failed to unfollow user: ${error.message}`);
}

export async function countFollowers(userId: string): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", userId);
  if (error) throw new Error(`Failed to count followers: ${error.message}`);
  return count || 0;
}

export async function countFollowing(userId: string): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", userId);
  if (error) throw new Error(`Failed to count following: ${error.message}`);
  return count || 0;
}

export async function countPosts(userId: string): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);
  if (error) throw new Error(`Error counting posts: ${error.message}`);
  return count || 0;
}

export async function getPostById(postId: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles:profiles!posts_user_id_fkey(*)')
    .eq('id', postId)
    .maybeSingle();
  if (error) throw new Error(`Failed to fetch post: ${error.message}`);
  if (!data) return null;
  const normalized: Post = {
    ...(data as any),
    profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] : (data as any).profiles,
  };
  return normalized;
}

export async function getPostReplies(postId: string): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles:profiles!posts_user_id_fkey(*)")
    .eq("parent_id", postId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`Failed to fetch post replies: ${error.message}`);
  return ((data || []).map((p: any) => ({
    ...p,
    profiles: Array.isArray(p.profiles) ? p.profiles[0] : p.profiles,
  })) as Post[]);
}

export async function addReply(userId: string, parentId: string, text: string): Promise<Post> {
  if (!userId) throw new Error("User id is required");
  if (!parentId) throw new Error("Parent post id is required");
  if (!text?.trim()) throw new Error("Reply text is required");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .insert([{ user_id: userId, parent_id: parentId, text }])
    .select("*, profiles:profiles!posts_user_id_fkey(*)")
    .single();
  if (error) throw new Error(`Failed to add reply: ${error.message}`);
  const normalized: Post = {
    ...(data as any),
    profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] : (data as any).profiles,
  };
  return normalized;
}
