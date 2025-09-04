import { getPostStats, fetchPosts } from "@/lib/supabase/queries";
import PostBox from "../posts/PostBox";

export default async function Timeline() {
  const posts = await fetchPosts();

  if (!posts.length) {
    return <div className="text-muted text-center py-8">No posts yet.</div>;
  }

  // Fetch stats for all posts in parallel
  const statsArray = await Promise.all(posts.map((post) => getPostStats(post.id)));

  return (
    <div>
      <section className="flex flex-col items-stretch">
        <div className="relative min-h-screen">
          {posts.map((post, idx) => {
            const stats = statsArray[idx];
            return (
              <PostBox
                key={post.id}
                post={post}
                stats={stats} // Pass stats as props
                userId={post.profiles?.id}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}