export type Profile = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  bio?: string;
};

export type Post = {
  id: string;
  text: string;
  created_at: string;
  file_urls: string[];
  likes: number;
  comments: number;
  reposts: number;
  views: number;
  profiles: Profile;
  bookmarks: number;
  parent_id?: string;
};

export interface Comment {
  id: string; // UUID of the comment
  created_at: string; // Timestamp when the comment was created
  post_id: string; // UUID of the post the comment belongs to
  user_id: string; // UUID of the user who made the comment
  content: string; // The content of the comment
  profiles: Profile; // The profile of the user who made the comment (joined from the profiles table)
}