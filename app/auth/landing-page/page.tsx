"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function LandingPage() {
  const [step, setStep] = useState<null | "nameEmail" | "userPass" | "success">(null);
  const [form, setForm] = useState({ name: "", email: "", username: "", password: "", repeatPassword: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle first step submit
  const handleNameEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) return setError("Name is required");
    if (!form.email.includes("@")) return setError("Valid email required");
    setStep("userPass");
  };

  // Handle second step submit
  const handleUserPass = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.username.length < 3) return setError("Username must be at least 3 characters");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    if (form.password !== form.repeatPassword) return setError("Passwords do not match");
    setLoading(true);
    try {
      const supabase = (await import("@/lib/supabase/client")).createClient();
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
            username: form.username,
            full_name: form.name,
          },
        },
      });
      if (error) throw error;
      setStep("success");
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };
  // After email verification, redirect to /app
  // Place this in your /auth/callback or /auth/confirm page, or use Supabase's onAuthStateChange in _app.tsx or a layout

  return (
    <main className="bg-background flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center">Create an Account</h1>
        <button
          className="w-full bg-white text-black border border-gray-300 rounded-full px-4 py-3 font-semibold text-lg shadow-sm hover:bg-gray-50 transition"
          onClick={() => setStep("nameEmail")}
        >
          Sign Up
        </button>
        <div className="text-center text-gray-500">OR</div>
        <button
          className="w-full bg-white text-black border border-gray-300 rounded-full px-4 py-3 font-semibold text-lg shadow-sm hover:bg-gray-50 transition"
          onClick={() => window.location.href = "/auth/login"}
        >
          Login
        </button>
      </div>

      {/* Step 1: Name & Email */}
      <Dialog open={step === "nameEmail"} onOpenChange={open => !open && setStep(null)}>
        <DialogContent className = "max-w-[600px] w-full border rounded-2xl border-border py-8 items-center" >
          <div className = "px-[20px] ">
            <div className = "flex flex-col items-stretch gap-4">
              <DialogHeader className = "my-[20px]">
                <DialogTitle className = "text-3xl">Create your account</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleNameEmail} className="flex flex-col gap-10">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="bg-background border border-border rounded py-4 px-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="bg-background border border-border rounded py-4 px-2"
                />
                {error && <div className="text-red-500">{error}</div>}
                <button type="submit" className="bg-foreground text-background rounded-full px-4 py-4 font-semibold w-full">
                  Next
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 2: Username & Password */}
      <Dialog open={step === "userPass"} onOpenChange={open => !open && setStep(null)}>
        <DialogContent className="max-w-[600px] w-full border rounded-2xl border-border py-8 items-center">
          <div className = "px-[20px] flex flex-col items-stretch gap-4">
            <DialogHeader>
              <DialogTitle className="text-3xl">Create your account</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUserPass} className="flex flex-col gap-4 w-full">
              <input
                type="text"
                placeholder="Username"
                required
                minLength={3}
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                className="bg-background border border-border rounded py-4 px-2"
              />
              <input
                type="password"
                placeholder="Password"
                required
                minLength={6}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="bg-background border border-border rounded py-4 px-2"
              />
              <input
                type="password"
                placeholder="Repeat Password"
                required
                minLength={6}
                value={form.repeatPassword}
                onChange={e => setForm(f => ({ ...f, repeatPassword: e.target.value }))}
                className="bg-background border border-border rounded py-4 px-2"
              />
              {error && <div className="text-red-500">{error}</div>}
              <button
                type="submit"
                className="bg-foreground text-background rounded-full px-4 py-4 font-semibold w-full"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 3: Success/Check Email */}
      <Dialog open={step === "success"} onOpenChange={open => !open && setStep(null)}>
        <DialogContent className = "max-w-[600px] w-full border rounded-2xl border-border py-8 items-center">
          <DialogHeader>
            <DialogTitle className = "text-3xl">Check Your Email</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-2">We've sent a confirmation email to <b>{form.email}</b>.</p>
            <p>Please check your inbox and follow the link to verify your account.</p>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}