import { createClient } from "@/lib/supabase/client";
import type { Post } from "@/lib/supabase/types";

export async function fetchPosts(): Promise<Post[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(`
      id,
      text,
      user_id,
      created_at,
      updated_at,
      file_urls,
      profiles!posts_user_id_fkey (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
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
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(`
      id,
      text,
      created_at,
      updated_at,
      file_urls,
      profiles!posts_user_id_fkey (
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
    (data || []).map((post: any) => ({
      ...post,
      profiles: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles,
    })) as Post[]
  );
}