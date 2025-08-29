import { createClient } from "@/lib/supabase/client";

export async function getPostStats(postId: string) {
  const supabase = createClient();

  const [{ count: likes }, { count: comments }, { count: reposts }, { count: views }] = await Promise.all([
    supabase.from("likes").select("*", { count: "exact", head: true }).eq("post_id", postId),
    supabase.from("comments").select("*", { count: "exact", head: true }).eq("post_id", postId),
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