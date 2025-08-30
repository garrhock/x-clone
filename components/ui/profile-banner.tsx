'use client';

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const supabase = createClient();

type BannerProps = {
  userId: string; // The ID of the user whose banner we want to display
  size?: "full" | "compact"; // "full" = full height, "compact" = smaller height
  className?: string; // Optional additional CSS classes
};

const sizeMap = {
  full: "h-[193.66px]",
  compact: "h-[100px]",
};

export default function Banner({ userId, size = "full", className = "" }: BannerProps) {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchBannerUrl = async () => {
      try {
        // Fetch the user's profile to get the banner URL
        const { data, error } = await supabase
          .from("profiles")
          .select("banner_url")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching banner URL:", error.message);
          return;
        }

        setBannerUrl(data?.banner_url || null);
      } catch (error) {
        console.error("Unexpected error fetching banner URL:", error);
      }
    };

    fetchBannerUrl();
  }, [userId]);

  return (
    <div
      className={cn(
        "relative w-full bg-muted",
        sizeMap[size],
        className
      )}
    >
      {bannerUrl ? (
        <img
          src={bannerUrl}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
          No Banner
        </div>
      )}
    </div>
  );
}