import React from 'react'
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import { BsChat } from "react-icons/bs";
import { IoBookmarkOutline, IoShareOutline, IoStatsChart } from 'react-icons/io5';
import { getPostStats } from "@/lib/supabase/queries";
import { fetchPosts } from '@/lib/supabase/fetch-posts';
import type { Post } from "@/lib/supabase/types";



const PreviewPostInteractions = async () => {
    const posts: Post[] = await fetchPosts();
    const statsArray = await Promise.all(posts.map(post => getPostStats(post.id)));
    const stats = statsArray[0]; // Assuming we want to show stats for the first post
  return (
    <div className="gap-x-[4px] mt-[12px] justify-between max-w-[600px] flex flex-row items-stretch">
        <div className="justify-start flex flex-row flex-1">
        <button className="cursor-pointer min-h-[20px] justify-center overflow-visible ">
            <div className="flex flex-row text-muted text-[15px]/[20px] wrap-break-word min-w-0 justify-start items-center font-normal">
            {/* Icon */}
            <BsChat className="w-[1.25em] max-w-full align-text-bottom fill-muted relative h-[1.25em] inline-block" />
            {/* Amt. */}
            <div className="min-w-[calc(1em+24px)] wrap-break-word text-[13px]/[16px] px-[4px]">
                <span className="min-w-0 wrap-break-word">{stats.comments}</span>
            </div>
            </div>
        </button>
        </div>
        <div className="justify-start flex flex-row flex-1">
        <button className="cursor-pointer min-h-[20px] justify-center overflow-visible ">
            <div className="flex flex-row text-muted text-[15px]/[20px] wrap-break-word min-w-0 justify-start items-center font-normal">
            {/* Icon */}
            <AiOutlineRetweet className="w-[1.25em] max-w-full align-text-bottom fill-muted relative h-[1.25em] inline-block" />
            {/* Amt. */}
            <div className="min-w-[calc(1em+24px)] wrap-break-word text-[13px]/[16px] px-[4px]">
                <span className="min-w-0 wrap-break-word">{stats.reposts}</span>
            </div>
            </div>
        </button>
        </div>
        <div className="justify-start flex flex-row flex-1">
        <button className="cursor-pointer min-h-[20px] justify-center overflow-visible ">
            <div className="flex flex-row text-muted text-[15px]/[20px] wrap-break-word min-w-0 justify-start items-center font-normal">
            {/* Icon */}
            <AiOutlineHeart className="w-[1.25em] max-w-full align-text-bottom fill-muted relative h-[1.25em] inline-block" />
            {/* Amt. */}
            <div className="min-w-[calc(1em+24px)] wrap-break-word text-[13px]/[16px] px-[4px]">
                <span className="min-w-0 wrap-break-word">{stats.likes}</span>
            </div>
            </div>
        </button>
        </div>
        <div className="justify-start flex flex-row flex-1">
        <button className="cursor-pointer min-h-[20px] justify-center overflow-visible ">
            <div className="flex flex-row text-muted text-[15px]/[20px] wrap-break-word min-w-0 justify-start items-center font-normal">
            {/* Icon */}
            <IoStatsChart className="w-[1.25em] max-w-full align-text-bottom fill-muted relative h-[1.25em] inline-block" />
            {/* Amt. */}
            <div className="min-w-[calc(1em+24px)] wrap-break-word text-[13px]/[16px] px-[4px]">
                <span className="min-w-0 wrap-break-word">{stats.views}</span>
            </div>
            </div>
        </button>
        </div>
        <div className="justify-start flex flex-row mr-[8px]">
        <button className="cursor-pointer min-h-[20px] justify-center overflow-visible ">
            <div className="text-muted text-[15px]/[20px] wrap-break-word min-w-0 justify-start items-center">
            <IoBookmarkOutline className="w-[1.25em] align-text-bottom fill-muted max-w-full h-[1.25em] inline-block relative" />
            </div>
        </button>
        </div>
        <div className="justify-start flex flex-row">
        <button className="cursor-pointer min-h-[20px] justify-center overflow-visible ">
            <div className="text-muted text-[15px]/[20px] wrap-break-word min-w-0 justify-start items-center">
            <IoShareOutline className="w-[1.25em] align-text-bottom fill-muted max-w-full h-[1.25em] inline-block relative" />
            </div>
        </button>
        </div>
    </div>
  )
}

export default PreviewPostInteractions