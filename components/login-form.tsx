"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();

    try {
      let emailToUse = identifier;

      // If not an email, look up by username
      if (!identifier.includes("@")) {
        const { data, error: userError } = await supabase
          .from("profiles")
          .select("email")
          .eq("username", identifier)
          .single();
        if (userError || !data?.email) {
          throw new Error("Username not found");
        }
        emailToUse = data.email;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: emailToUse,
        password,
      });
      if (error) throw error;
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-8 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-2">Login</h2>
      <input
        type="text"
        placeholder="Username or Email"
        required
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border rounded px-3 py-2"
      />
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white rounded px-4 py-2 font-semibold"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}