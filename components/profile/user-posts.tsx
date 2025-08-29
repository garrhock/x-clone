// ...existing code...
import { fetchPostsByUser } from "@/lib/supabase/fetch-posts";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { IoBookmarkOutline, IoShareOutline, IoStatsChart } from "react-icons/io5";
import { MdMoreHoriz } from "react-icons/md";
import ProfilePictureSM from "./avatar";
import { getPostStats } from "@/lib/supabase/queries/post-stats";

function timeSince(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "yr", seconds: 31536000 },
    { label: "w", seconds: 604800 },
    { label: "d", seconds: 86400 },
    { label: "hr", seconds: 3600 },
    { label: "min", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count}${interval.label}`;
    }
  }
  return "now";
}

export default async function UserPosts({ userId }: { userId: string }) {
  const posts = await fetchPostsByUser(userId);

  if (!posts.length) {
    return (
      <div className="text-muted text-center py-8">No posts yet.</div>
    );
  }

  // fetch stats for all posts in parallel
  const statsArray = await Promise.all(posts.map((p) => getPostStats(p.id)));

  return (
    <div>
      <section className="flex flex-col items-stretch">
        <div className="relative">
          {posts.map((post, idx) => {
            const stats = statsArray[idx] || { likes: 0, comments: 0, reposts: 0, views: 0 };
            return (
              <div key={post.id} className="border-b-[1px] block border-border">
                <div className="flex flex-col items-stretch">
                  <article className="px-[16px] flex flex-row w-full cursor-pointer overflow-hidden">
                    <div className="flex flex-col flex-shrink flex-grow">
                      <div className="flex flex-col items-stretch">
                        <div className="flex flex-row">
                          <div className="pt-[12px] basis-0 flex-grow"></div>
                        </div>
                      </div>
                      <div className="flex flex-row items-stretch">
                        {/* Profile Picture */}
                        <div className="basis-[40px] flex-grow-0 items-center mr-[8px]">
                          <ProfilePictureSM
                            userId={userId}
                            avatarUrl={post.profiles?.avatar_url || ""}
                          />
                        </div>
                        {/* Post Content */}
                        <div className="pb-[12px] basis-0 justify-center flex-grow flex flex-col">
                          {/* User Info */}
                          <div className="mb-[2px]">
                            <div className="items-start justify-between flex flex-row">
                              {/* Main Profile Info */}
                              <div className="items-baseline shrink-1 flex flex-row">
                                <div className="max-w-full shrink-1 outline-none">
                                  <div className="max-w-full items-center flex flex-row">
                                    {/* Name */}
                                    <span className="text-[15px]/[20px] font-bold min-w-0 items-center text-white wrap-break-word overflow-hidden">
                                      <span className="min-w-0 overflow-ellipsis">
                                        <span className="min-w-0">
                                          {post.profiles?.full_name || "Unknown"}
                                        </span>
                                      </span>
                                    </span>
                                    {/* Username */}
                                    <div className="ml-[4px] flex flex-row shrink-1">
                                      <div className="items-baseline flex flex-row">
                                        {/* @ */}
                                        <div className="max-w-full">
                                          <span className="text-muted text-[15px]/[20px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                            <span className="wrap-break-word min-w-0">
                                              @{post.profiles?.username || "unknown"}
                                            </span>
                                          </span>
                                        </div>
                                        {/* - */}
                                        <div className="text-muted text-[15px]/[20px] font-normal px-[4px] min-w-0 items-center wrap-break-word overflow-hidden">
                                          <span className="min-w-0 wrap-break-word ">·</span>
                                        </div>
                                        {/* time */}
                                        <div className="shrink-0 flex flex-row">
                                          <span className="gap-[4px] flex-wrap text-muted shrink-0 text-[15px]/[20px] wrap-break-word min-w-0 font-normal inline-flex">
                                            <time dateTime={post.created_at}>
                                              {timeSince(post.created_at)}
                                            </time>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* More */}
                              <div className="ml-[8px]">
                                <div className="gap-[8px] justify-between items-center flex flex-row">
                                  <div className="items-center flex flex-row justify-start">
                                    <button className="cursor-pointer min-h-[20px] justify-center overflow-visible items-stretch">
                                      <div className="text-muted text-[15px]/[20px] items-center font-normal justify-start min-w-0 wrap-break-word flex">
                                        <MdMoreHoriz className="w-[1.25em] fill-muted align-text-bottom max-w-full h-[1.25em] inline-block" />
                                      </div>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Caption */}
                          <div className="text-foreground text-[15px]/[20px] wrap-break-word relative font-normal min-w-0">
                            <span className="wrap-break-word min-w-0">{post.text}</span>
                          </div>
                          {/* Attached Files */}
                          {post.file_urls && post.file_urls.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {post.file_urls.map((url: string) =>
                                url.match(/\.(mp4|webm|ogg)$/i) ? (
                                  <video key={url} src={url} controls className="max-w-full max-h-80 rounded" />
                                ) : (
                                  <img key={url} src={url} alt="attachment" className="max-w-full max-h-80 rounded" />
                                )
                              )}
                            </div>
                          )}
                          {/* Toolbar */}
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
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}