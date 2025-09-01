import { fetchPostsByUser } from "@/lib/supabase/fetch-posts";
import { getPostStats } from "@/lib/supabase/queries";
import PostBox from "../posts/PostBox";
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
            return <PostBox key={post.id} post={post} stats={stats} userId={userId} />;
          })}
        </div>
      </section>
    </div>
  );
}