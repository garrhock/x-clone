import { fetchPosts } from "@/lib/supabase/fetch-posts";
import PostBox from "./PostBox";
import type { Post } from "@/lib/supabase/types";
import { getPostStats } from "@/lib/supabase/queries";

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

export default async function Timeline() {
  const posts: Post[] = await fetchPosts();

  if (!posts.length) {
    return (
      <div className="text-muted text-center py-8">No posts yet.</div>
    );
  }

  // Fetch stats for all posts in parallel
  const statsArray = await Promise.all(posts.map(post => getPostStats(post.id)));

  return (
    <div>
      <section className="flex flex-col items-stretch">
        <div className="relative min-h-screen ">
          {posts.map((post, idx) => {
            const stats = statsArray[idx];
            return <PostBox key={post.id} post={post} stats={stats} />;
          })}
        </div>
      </section>
    </div>
  );
}