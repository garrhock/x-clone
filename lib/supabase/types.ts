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
};