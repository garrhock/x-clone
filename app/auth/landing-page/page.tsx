"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BsTwitterX } from "react-icons/bs";

export default function LandingPage() {
  // ...existing state declarations...
  const [step, setStep] = useState<null | "nameEmail" | "userPass" | "success" | "loginEmail" | "loginPass" | "loginSuccess">(null);
  const [form, setForm] = useState({ name: "", email: "", username: "", password: "", repeatPassword: "" });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // Helper: check if any dialog is open
  const isDialogOpen = ["nameEmail", "userPass", "success", "loginEmail", "loginPass"].includes(step ?? "");

  // Handle sign up first step (name/email)
  const handleNameEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) return setError("Name is required");
    if (!form.email.includes("@")) return setError("Valid email required");
    setStep("userPass");
  };

  // Handle sign up second step (username/password)
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

  // Handle login first step (email)
  const handleLoginEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!loginForm.email.includes("@")) return setError("Valid email required");
    setStep("loginPass");
  };

  // Handle login second step (password)
  const handleLoginPass = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (loginForm.password.length < 6) return setError("Password must be at least 6 characters");
    setLoading(true);
    try {
      const supabase = (await import("@/lib/supabase/client")).createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });
      if (error) throw error;
  setStep("loginSuccess");
  setTimeout(() => window.location.href = "/", 1000);
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };
  // After email verification, redirect to /app
  // Place this in your /auth/callback or /auth/confirm page, or use Supabase's onAuthStateChange in _app.tsx or a layout

  return (
    <main className="bg-background flex min-h-screen items-center justify-center relative">
      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-slate-500 z-10 transition-opacity"
          aria-hidden="true"
        ></div>
      )}
      {step === "loginSuccess" ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <BsTwitterX className="size-72 animate-pulse text-white" />
        </div>
      ) : (
        <div className = "flex flex-row w-screen h-screen justify-apart pb-10">
          <div className = "w-[calc(55%)] flex items-center justify-center p-8">
            <BsTwitterX className = "size-72 text-white" />
          </div>
          <div className="w-[calc(45%)] max-w-sm flex flex-col justify-center  p-9">
            <h1 className="text-7xl font-bold text-nowrap my-12">Happening now</h1>
            <h1 className="text-3xl font-bold mb-8">Join today.</h1>
            <div className = "flex flex-col gap-1">
              <button
              className="w-full bg-white text-black border border-gray-300 rounded-full px-4 py-3 font-semibold text-lg shadow-sm hover:bg-gray-50 transition"
              onClick={() => setStep("nameEmail")}
              >
                Create Account
              </button>
              <div className="text-center text-foreground">OR</div>
              <button
                className="w-full bg-background text-foreground border border-foreground rounded-full px-4 py-3 font-semibold text-lg shadow-sm hover:bg-gray-50 transition"
                onClick={() => setStep("loginEmail")}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Name & Email */}
      <Dialog
        open={step === "nameEmail"}
        onOpenChange={(open) => !open && setStep(null)}
      >
        <DialogContent className="max-w-[600px] w-full border rounded-2xl border-border py-8 items-center">
          <div className="px-[20px] ">
            <div className="flex flex-col items-stretch gap-4">
              <DialogHeader className="my-[20px]">
                <DialogTitle className="text-3xl">
                  Create your account
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleNameEmail} className="flex flex-col gap-10">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="bg-background border border-border rounded py-4 px-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="bg-background border border-border rounded py-4 px-2"
                />
                {error && <div className="text-red-500">{error}</div>}
                <button
                  type="submit"
                  className="bg-foreground text-background rounded-full px-4 py-4 font-semibold w-full"
                >
                  Next
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 2: Username & Password */}
      <Dialog
        open={step === "userPass"}
        onOpenChange={(open) => !open && setStep(null)}
      >
        <DialogContent className="max-w-[600px] w-full border rounded-2xl border-border py-8 items-center">
          <div className="px-[20px] flex flex-col items-stretch gap-4">
            <DialogHeader>
              <DialogTitle className="text-3xl">
                Create your account
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleUserPass}
              className="flex flex-col gap-4 w-full"
            >
              <input
                type="text"
                placeholder="Username"
                required
                minLength={3}
                value={form.username}
                onChange={(e) =>
                  setForm((f) => ({ ...f, username: e.target.value }))
                }
                className="bg-background border border-border rounded py-4 px-2"
              />
              <input
                type="password"
                placeholder="Password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                className="bg-background border border-border rounded py-4 px-2"
              />
              <input
                type="password"
                placeholder="Repeat Password"
                required
                minLength={6}
                value={form.repeatPassword}
                onChange={(e) =>
                  setForm((f) => ({ ...f, repeatPassword: e.target.value }))
                }
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

      {/* Step 3: Success/Check Email (Sign Up) */}
      <Dialog
        open={step === "success"}
        onOpenChange={(open) => !open && setStep(null)}
      >
        <DialogContent className="max-w-[600px] w-full border rounded-2xl border-border py-8 items-center">
          <DialogHeader>
            <DialogTitle className="text-3xl">Check Your Email</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-2">
              We've sent a confirmation email to <b>{form.email}</b>.
            </p>
            <p>
              Please check your inbox and follow the link to verify your
              account.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Login Step 1: Email */}
      <Dialog
        open={step === "loginEmail"}
        onOpenChange={(open) => !open && setStep(null)}
      >
        <DialogContent>
          <div className="flex flex-col">
            {/* Top Bar */}
            <div className="h-14 flex justify-center">
              <BsTwitterX className="size-7 mt-3" />
            </div>
            {/* Main Box */}
            <div className="px-8 pb-12 pt-10 mx-auto">
              <div className="justify-start text-left">
                <DialogTitle className="my-5">Sign in to X</DialogTitle>
              </div>
              <form
                onSubmit={handleLoginEmail}
                className="flex flex-col gap-10 w-full"
              >
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-[438px] h-[60px] bg-background border border-border rounded pt-3 pb-2 px-2 mt-4 "
                />
                {error && <div className="text-red-500">{error}</div>}
                <button
                  type="submit"
                  className="bg-foreground text-background rounded-full px-4 py-2 font-semibold w-full"
                >
                  <span className="text-sm font-bold">Next</span>
                </button>
                <button
                  type="button"
                  className="bg-background text-foreground rounded-full px-4 py-2 font-semibold w-full border border-foreground"
                >
                  <span className="text-sm font-bold">Forgot password?</span>
                </button>
                <div className="flex flex-row mt-10">
                  <span className="text-muted whitespace-pre">
                    Don't have an account?{" "}
                  </span>
                  <button className="text-highlight">Sign up</button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Login Step 2: Password */}
      <Dialog
        open={step === "loginPass"}
        onOpenChange={(open) => !open && setStep(null)}
      >
        <DialogContent>
          <div className="flex flex-col justify-between mx-auto px-8">
            <div>
              <div className="h-14 flex justify-center">
                <BsTwitterX className="size-7 mt-3" />
              </div>
              <div>
                <div className="justify-start text-left">
                  <DialogTitle className="mt-5 mb-8">
                    Enter your password
                  </DialogTitle>
                </div>
                <form
                  onSubmit={handleLoginPass}
                  className="flex flex-col gap-8 w-full"
                >
                  <input
                    type="email"
                    value={loginForm.email}
                    disabled
                    readOnly
                    className="bg-[#202327] rounded py-4 px-2 text-muted cursor-default w-[438px] h-[60px]"
                  />
                  <div className = "flex flex-col">
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      minLength={6}
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm((f) => ({ ...f, password: e.target.value }))
                      }
                      className="bg-background border border-border rounded py-4 px-2 w-[438px] h-[60px]"
                    />
                    <button className="pl-2 text-highlight text-left text-sm">Forgot password?</button>
                  </div>
                  {error && <div className="text-red-500">{error}</div>}
                </form>
              </div>
            </div>
            <div className = "flex flex-col">
              <button
                type="submit"
                className="bg-foreground text-background rounded-full px-4 py-4 font-semibold w-full my-6"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
              <div className="flex flex-row mb-6">
                <span className="text-muted whitespace-pre">
                  Don't have an account?{" "}
                </span>
                <button className="text-highlight">Sign up</button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Login Step 3: Success */}
      {/* No dialog for loginSuccess, handled in main render above */}
    </main>
  );
}