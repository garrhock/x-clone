"use client";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton({ username }: { username: string }) {
  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      // Optionally show an error message
      alert("Logout failed: " + error.message);
    } else {
      // Optionally redirect or refresh
      window.location.href = "/auth/landing-page"; // Redirect to landing page after logout
    }
  };

  return (
    <button onClick={handleLogout} className = "py-3 px-4 w-full text-left" >
        <span className = "font-bold ">Log out @{username}</span>
    </button>
  );
}