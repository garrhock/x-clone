'use client';

import React from "react";
import { useRouter } from "next/navigation";

export default function ProfilePictureLG({ userId, avatarUrl }: { userId: string, avatarUrl: string }) {
    const router = useRouter();

    return (
        <div className="relative size-36">
            <div className="absolute transform -translate-y-[60%] w-full h-full">
                <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="border-4 border-background w-full h-full rounded-full object-cover cursor-pointer"
                    onClick={() => router.push(`/profile/${userId}`)}
                />
            </div>
        </div>
    );
}
