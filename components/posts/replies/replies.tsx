
import PostBox from '../PostBox';

export default function Reply({ reply }: { reply: any }) {
  return (
    <PostBox
      userId={reply.profiles?.id || ""}
      post={reply}
      stats={{
        likes: reply.likes_count || 0,
        comments: reply.comments_count || 0,
        reposts: reply.shares_count || 0,
        views: reply.views_count || 0,
      }}
    />
  );
}

