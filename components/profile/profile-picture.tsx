'use client';

import React from "react";
import { useRouter } from "next/navigation";

export default function ProfilePicture() {
    const router = useRouter();

    return (
    <div className="relative h-[40px] w-[40px]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <img
                src="https://pbs.twimg.com/profile_images/1880129627672219648/alLHN898_normal.jpg"
                alt="User avatar"
                className="w-full h-full rounded-full object-cover cursor-pointer"
                onClick={() => router.push("/profile")}
            />
        </div>
    </div>
);
}
