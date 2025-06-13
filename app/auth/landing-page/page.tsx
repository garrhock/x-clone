"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and redirect if so
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.replace("/app"); // or your main app route
      }
    };
    checkAuth();
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Create an Account</h1>
        <button
          className="bg-blue-600 text-white rounded px-6 py-2 font-semibold mb-6"
          onClick={() => router.push("/auth/sign-up")}
        >
          Sign Up
        </button>
      </div>
      <div className="text-center">
        <p className="mb-2">Already have an account?</p>
        <button
          className="bg-gray-200 text-gray-900 rounded px-6 py-2 font-semibold"
          onClick={() => router.push("/auth/login")}
        >
          Login
        </button>
      </div>
    </main>
  );
}