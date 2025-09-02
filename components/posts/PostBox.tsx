"use client";
import React from "react";
import { MdMoreHoriz } from "react-icons/md";
import ProfilePictureSM from "../ui/avatar";
import PreviewPostInteractions from "./toolbars/preview-post-interactions";
import Link from "next/link";
import Text from "../text"; // Import the Text component

interface PostBoxProps {
  post: any;
  stats: {
    likes: number;
    comments: number;
    reposts: number;
    views: number;
  };
  userId?: string;
}

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
    if (count >= 1) return `${count}${interval.label}`;
  }
  return "now";
}

const PostBox: React.FC<PostBoxProps> = ({ post, stats, userId }) => {
  return (
    <article className="relative border-b border-border hover:bg-foreground/5 transition-colors duration-200">
      {/* Main post link overlay */}
      <Link
        href={`/post-page/${post.id}`}
        className="absolute inset-0 z-0"
        aria-label={`View post by ${post.profiles?.full_name || "user"}`}
      >
        <span className="sr-only">View post</span>
      </Link>

      <div className="relative z-10 px-4 py-3 flex flex-row pointer-events-none">
        {/* Profile picture */}
        <div className="mr-2 pointer-events-auto">
          <Link
            href={`/profile-page/${userId || post.profiles?.id || ""}`}
            className="inline-block"
          >
            <ProfilePictureSM
              userId={userId || post.profiles?.id || ""}
              avatarUrl={post.profiles?.avatar_url || ""}
            />
          </Link>
        </div>

        {/* Post content */}
        <div className="flex flex-col flex-grow">
          {/* Header (name, username, more button) */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 pointer-events-auto">
              <Link
                href={`/profile-page/${post.profiles?.id || ""}`}
                className="font-bold text-white hover:underline"
              >
                <Text variant="subheading" color="foreground"> 
                  {post.profiles?.full_name || "Unknown"}
                </Text>
              </Link>
              <Link
                href={`/profile-page/${post.profiles?.id || ""}`}
                className=" text-muted hover:underline"
              >
                <Text variant="subheading" color="muted" className = "font-normal">
                  @{post.profiles?.username || "unknown"}
                </Text>
              </Link>
              <Text variant="subheading" color="muted" className="font-normal">·</Text>
              <time
                dateTime={post.created_at}
                className="text-muted text-sm"
              >
                <Text variant="subheading" color="muted" className="font-normal">
                  {timeSince(post.created_at)}
                </Text>
              </time>
            </div>

            <button className="text-muted hover:text-foreground pointer-events-auto">
              <MdMoreHoriz className="w-5 h-5" />
            </button>
          </div>

          {/* Post text */}
          <p className="text-foreground text-sm">{post.text}</p>

          {/* Attached media */}
          {post.file_urls?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {post.file_urls.map((url: string) =>
                url.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video
                    key={url}
                    src={url}
                    controls
                    className="max-w-full max-h-80 rounded"
                  />
                ) : (
                  <img
                    key={url}
                    src={url}
                    alt="attachment"
                    className="max-w-full max-h-80 rounded"
                  />
                )
              )}
            </div>
          )}

          {/* Toolbar */}
          <PreviewPostInteractions stats={stats} />
        </div>
      </div>
    </article>
  );
};

export default PostBox;