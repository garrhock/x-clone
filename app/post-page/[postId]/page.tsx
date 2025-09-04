import { getPostById, getPostReplies, getPostStats } from "@/lib/supabase/queries";
import { ProfilePicture } from "@/components/profile";
import type { Post, Comment, Profile } from "@/lib/supabase/types";
import LeftSideBar from "@/components/left-sidebar/LeftSideBar";
import RightSideBar from "@/components/right-sidebar/RightSideBar";
import Text from "@/components/text";
import Link from "next/link";
import { IoArrowBackOutline} from "react-icons/io5";
import { MdMoreHoriz } from "react-icons/md";
import FullPostInteractions from "@/components/posts/toolbars/full-post-interactions";
import ReplyingForm from "@/components/posts/upload-post/replying-form";
import Reply from "@/components/posts/replies/replies";


export default async function PostPage({ params }: { params: { postId: string } }) {
  const { postId } = await params;

  // Fetch the post and its comments
  const post: Post | null = await getPostById(postId);
  const replies: Comment[] = await getPostReplies(postId);
  const stats = await getPostStats(postId);
  if (!post) {
    return <div className="text-muted text-center py-8">Post not found.</div>;
  }

  const userProfile: Profile = post.profiles;
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
   
  return (
    <div className="w-full h-screen flex justify-center items-center relative bg-black text-white">
      <div className="w-full max-w-[1385px] h-full flex relative">
        <LeftSideBar />
        <main className = "w-full h-full flex flex-col items-start flex-grow flex-shrink">
          <div className = "w-[1050px] items-stretch flex flex-col flex-grow flex-shrink ">
            <div className= "justify-between items-stretch flex flex-row flex-grow w-full ">
              <div className="max-w-[600px] flex flex-col border-l-[1px] border-r-[1px] border-border flex-grow w-full">
                {/* Top Bar */}
                <div className="flex flex-row align- items-stretch z-10 justify-around backdrop-blur-md bg-background/75 sticky top-0 border-b-[0.5px] border-border">
                  <div className="flex flex-row items-center justify-between w-full px-4 h-[53px]">
                    {/* Back Button */}
                    <div className="flex flex-col min-w-[56px] min-h-[32px] align-stretch items-start justify-center ">
                        <div className="items-center flex flex-col">
                          <Link 
                            href="/"
                            className="rounded-full hover:bg-foreground/10 transition-colors duration-200 min-w-[36px] min-h-[36px] inline-flex items-center justify-center"
                          >
                            <IoArrowBackOutline className="size-5 align-middle" />
                          </Link>
                        </div>
                    </div>
                    {/* Name + num posts */}
                    <div className="flex flex-col flex-grow">
                      <div className="relative h-full items-start flex flex-col justify-center">
                        <div className="py-[2px] max-w-full">
                          <Text variant="heading">Post</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-[16px]">
                  {/* pfp and name */}
                <div className="pt-[12px] flex flex-row items-stretch">
                  {/* Profile Picture */}
                  <div className="basis-[40px] flex-grow-0 items-center mr-[8px]">
                    <ProfilePicture
                      userId={userProfile?.id || ""}
                      avatarUrl={userProfile?.avatar_url || ""}
                      size="sm"
                    />
                  </div>
                  {/* Post Content */}
                  <div className="pb-[12px] basis-0 justify-center flex-grow flex flex-col ">
                    {/* User Info */}
                    <div className="mb-[2px]">
                      <div className="items-start justify-between flex flex-row">
                        {/* Main Profile Info */}
                        <div className="items-baseline shrink-1 flex flex-row">
                          <div className="max-w-full shrink-1 outline-none">
                            <div className="max-w-full items-start flex flex-col">
                              {/* Name */}
                              <Link href={`/profile-page/${userProfile.id}`}>
                                <div className="text-[15px]/[20px] font-bold min-w-0 items-center text-white wrap-break-word overflow-hidden">
                                  <span className="min-w-0 overflow-ellipsis">
                                    <span className="min-w-0">
                                      {userProfile?.full_name || "Unknown"}
                                    </span>
                                  </span>
                                </div>
                              </Link>
                              {/* Username */}
                              <div className="flex flex-row shrink-1">
                                <div className="items-baseline flex flex-row">
                                  {/* @ */}
                                  <div className="max-w-full">
                                    <Link href={`/profile-page/${userProfile.id}`} className="cursor-pointer">
                                      <div className="text-muted text-[15px]/[20px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                        <span className="wrap-break-word min-w-0">
                                          @{userProfile?.username || "unknown"}
                                        </span>
                                      </div>
                                    </Link>
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
                  </div>
                </div>
                {/* Caption */}
                <Text variant="post" color="foreground">
                  {post.text}
                </Text>
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
                <div className="py-2 border-b-[1px] border-border" />
                <FullPostInteractions stats={stats} />
                <div className="py-2 border-b-[1px] border-border" />
                <ReplyingForm parentPostId={post.id} />
                </div>
                <div className="py-2 border-b-[1px] border-border" />
                {/* Replies Section */}
                <div>
                  {replies.length === 0 ? (
                    <div className="text-muted text-center py-4">No replies yet</div>
                  ) : (
                    replies.map((reply) => <Reply key={reply.id} reply={reply} />)
                  )}
                </div>
              </div>
              <RightSideBar   />
            </div>
          </div>
        </main>
      </div>
    </div>
    
  );
}