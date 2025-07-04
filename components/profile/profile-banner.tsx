'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type BannerProps = {
  userId: string;
  size?: "full" | "compact";
};

export default function Banner({ userId, size = "full" }: BannerProps) {
  const [src, setSrc] = useState<string | null>(null);
  const height = size === "compact" ? "h-[100px]" : "h-[200px]";

  useEffect(() => {
    const fetchBanner = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("banner_url")
        .eq("id", userId)
        .single();

      if (!error && data?.banner_url) {
        setSrc(data.banner_url);
      }
    };

    fetchBanner();
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
