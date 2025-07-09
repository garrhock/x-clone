'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type ProfilePictureProps = {
  userId: string;
  avatarUrl: string;
  size?: "sm" | "lg" | number; // "sm" = 40px, "lg" = 144px, or custom px
  className?: string;
};

const sizeMap = {
  sm: "h-[40px] w-[40px]",
  lg: "size-36", // 9rem = 144px
};

export default function ProfilePicture({
  userId,
  avatarUrl,
  size = "sm",
  className = "",
}: ProfilePictureProps) {
  const router = useRouter();

  // Allow custom numeric size
  const sizeClass =
    typeof size === "number"
      ? `h-[${size}px] w-[${size}px]`
      : sizeMap[size] || sizeMap.sm;

    const borderClass = size === "lg" ? "border-background border-4 rounded-full" : "";


  return (
    <div className={cn("relative", sizeClass, className, borderClass)}>
      <img
        src={avatarUrl}
        alt="User avatar"
        className="w-full h-full rounded-full object-cover border-background cursor-pointer"
        onClick={() => router.push(`/profile/${userId}`)}
      />
    </div>
  );
}