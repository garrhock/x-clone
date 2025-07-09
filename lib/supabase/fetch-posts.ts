import { createClient } from "./server";
import type { Post } from "@/lib/supabase/types";

export async function fetchPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(`
      id, text, created_at, file_urls,
      likes, comments, reposts, views, bookmarks,
      profiles:user_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (
    data?.map(post => ({
      ...post,
      profiles: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles
    })) || []
  );
}

export async function fetchPostsByUser(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(`
      id, text, created_at, file_urls,
      likes, comments, reposts, views, bookmarks,
      profiles:user_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (
    data?.map(post => ({
      ...post,
      profiles: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles
    })) || []
  );
}