'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { getProfileById } from "@/lib/supabase/queries/get-profile";
type BannerProps = {
  userId: string;
  size?: "full" | "compact";
};

export default function Banner({ userId, size = "full" }: BannerProps) {
  const [src, setSrc] = useState<string | null>(null);
  const height = size === "compact" ? "h-[100px]" : "h-[200px]";

  useEffect(() => {
    const fetchBanner = async () => {
      const profile = await getProfileById(userId);
      if (profile) setSrc(profile.banner_url);
    };
    if (userId) fetchBanner();
  }, [userId]);

  return (
    <div className={`w-full ${height} bg-muted relative`}>
      {src && (
        <Image
          src={src}
          alt="Banner"
          fill
          className="object-cover"
        />
      )}
    </div>
  );
}
