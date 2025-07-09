'use client';
import { useState } from "react";

export default function FollowButton({ userId }: { userId: string }) {
    const [following, setFollowing] = useState(false);
    return (
        <div className = "min-w-[78px] ml-[12px] ">
            <button className='bg-foreground cursor-pointer px-[16px] min-h-[32px] min-w-[32px] border-transparent rounded-full  ' onClick={() => setFollowing(f => !f)}>
                <div className = "text-background text-[15px]/[20px] font-bold wrap-break-word justify-center text-center grow ">
                    <span>{following ? "Following" : "Follow"}</span>
                </div>
            </button>
        </div>
    );
}