import { fetchPostsByUser, getPostStats } from "@/lib/supabase/queries.server";
import PostBox from "../posts/PostBox";

export default async function UserPosts({ userId }: { userId: string }) {
  const posts = await fetchPostsByUser(userId);

  if (!posts.length) {
    return <div className="text-muted text-center py-8">No posts yet.</div>;
  }

  // Fetch stats for all posts in parallel
  const statsArray = await Promise.all(posts.map((post) => getPostStats(post.id)));

  return (
    <div>
      <section className="flex flex-col items-stretch">
        <div className="relative">
          {posts.map((post, idx) => {
            const stats = statsArray[idx];
            return (
              <PostBox
                key={post.id}
                post={post}
                stats={stats} // Pass stats as props
                userId={userId}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}