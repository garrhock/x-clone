import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

export async function getProfileById(userId: string): Promise<Profile | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw new Error(`Failed to fetch profile: ${error.message}`);
  return data as Profile | null;
}
