export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: string[];
  following: string[];
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  image?: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}