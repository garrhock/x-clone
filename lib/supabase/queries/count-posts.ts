import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

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