'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type ProfilePictureProps = {
  userId: string;
  avatarUrl: string;
  size?: "sm" | "lg" | "md"; // "sm" = 40px, "lg" = 144px, or custom px
  className?: string;
};

const sizeMap = {
  sm: "h-[40px] w-[40px]",
  md: "h-[7rem] w-[7rem]",
  lg: "h-[133.5px] w-[133.5px]",
};

export default function ProfilePicture({
  userId,
  avatarUrl,
  size = "sm",
  className = "",
}: ProfilePictureProps) {
  const router = useRouter();

  const showBorder = size !== "sm";

  return (
    <div className={cn(showBorder && "absolute border-4 border-background", "rounded-full")}>
      <div
        className={cn(
          "relative flex items-center justify-center",
          sizeMap[size],
          className
        )}
      >
        {showBorder && (
          <div className="absolute inset-0 rounded-full border-4 border-black pointer-events-none" />
        )}
        <img
          src={avatarUrl}
          alt="User avatar"
          className="w-full h-full rounded-full object-cover cursor-pointer"
          onClick={() => router.push(`/profile-page/${userId}`)}
          style={{ zIndex: 1, position: "relative" }}
        />
      </div>
    </div>
  );
}