"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (fullName.trim().length < 1) {
      setError("Full name is required.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username, full_name: fullName }, // Pass both to trigger
        },
      });
      if (error) throw error;
      // Optionally, redirect to a "check your email" page if email confirmation is enabled
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="max-w-md mx-auto mt-8 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
      <input
        type="text"
        placeholder="Full Name"
        required
        value={fullName}
        onChange={e => setFullName(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="text"
        placeholder="Username"
        required
        minLength={3}
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
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
      <input
        type="password"
        placeholder="Repeat Password"
        required
        value={repeatPassword}
        onChange={e => setRepeatPassword(e.target.value)}
        className="border rounded px-3 py-2"
      />
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white rounded px-4 py-2 font-semibold"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}