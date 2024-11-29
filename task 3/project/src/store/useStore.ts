import { create } from 'zustand';
import { User, Post } from '../types';
import { mockUsers, mockPosts } from '../data/mockData';

interface Store {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  setCurrentUser: (user: User | null) => void;
  toggleFollow: (userId: string) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  createPost: (content: string, image?: string) => void;
}

export const useStore = create<Store>((set) => ({
  currentUser: mockUsers[0],
  users: mockUsers,
  posts: mockPosts,
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  toggleFollow: (userId) => 
    set((state) => {
      if (!state.currentUser) return state;
      
      const isFollowing = state.currentUser.following.includes(userId);
      const updatedCurrentUser = {
        ...state.currentUser,
        following: isFollowing
          ? state.currentUser.following.filter(id => id !== userId)
          : [...state.currentUser.following, userId]
      };
      
      const updatedUsers = state.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            followers: isFollowing
              ? user.followers.filter(id => id !== state.currentUser!.id)
              : [...user.followers, state.currentUser!.id]
          };
        }
        return user;
      });
      
      return {
        currentUser: updatedCurrentUser,
        users: updatedUsers
      };
    }),
  
  toggleLike: (postId) =>
    set((state) => {
      if (!state.currentUser) return state;
      
      return {
        posts: state.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                likes: post.likes.includes(state.currentUser!.id)
                  ? post.likes.filter(id => id !== state.currentUser!.id)
                  : [...post.likes, state.currentUser!.id]
              }
            : post
        )
      };
    }),
  
  addComment: (postId, content) =>
    set((state) => {
      if (!state.currentUser) return state;
      
      const newComment = {
        id: Date.now().toString(),
        userId: state.currentUser.id,
        content,
        createdAt: new Date().toISOString()
      };
      
      return {
        posts: state.posts.map(post =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      };
    }),
  
  createPost: (content, image) =>
    set((state) => {
      if (!state.currentUser) return state;
      
      const newPost = {
        id: Date.now().toString(),
        userId: state.currentUser.id,
        content,
        image,
        likes: [],
        comments: [],
        createdAt: new Date().toISOString()
      };
      
      return {
        posts: [newPost, ...state.posts]
      };
    })
}));