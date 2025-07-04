import { createClient } from "./server";

export async function fetchPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(`
      id, text, created_at, file_urls,
      profiles:user_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}
export async function fetchPostsByUser(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(`
      id, text, created_at, file_urls,
      profiles:user_id (
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
      // If profiles is an array, flatten it to a single object
      profiles: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles
    })) || []
  );
}