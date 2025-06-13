import { createClient } from "./server";

export async function fetchPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(`
      id, text, created_at, file_urls,
      profiles:user_id (
        username,
        full_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}