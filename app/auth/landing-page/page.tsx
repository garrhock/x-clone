"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignUpForm from "@/components/sign-up-form";
import LoginForm from "@/components/login-form";
import { BsTwitterX } from "react-icons/bs";

export default function LandingPage() {
  const [modal, setModal] = useState<"signup" | "login" | null>(null);

  return (
    <main className="bg-background flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <BsTwitterX className = "pb-[24px] size-16 align-bottom max-w-full self-center"/>
        <h1 className="text-3xl font-bold text-center">Create an Account</h1>
        <button
          className="w-full bg-foreground text-background border  rounded-full px-4 py-3 font-semibold text-lg shadow-sm hover:bg-gray-50 transition"
          onClick={() => setModal("signup")}
        >
          Sign Up
        </button>
        <div className="text-center text-gray-500">OR</div>
        <button
          className="w-full bg-foreground text-background border  rounded-full px-4 py-3 font-semibold text-lg shadow-sm hover:bg-gray-50 transition"
          onClick={() => setModal("login")}
        >
          Login
        </button>
      </div>

      <Dialog open={modal !== null} onOpenChange={open => !open && setModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modal === "signup" ? "Sign Up" : "Login"}
            </DialogTitle>
          </DialogHeader>
          {modal === "signup" && <SignUpForm />}
          {modal === "login" && <LoginForm />}
        </DialogContent>
      </Dialog>
    </main>
  );
}