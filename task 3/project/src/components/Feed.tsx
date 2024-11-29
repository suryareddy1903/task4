import React from 'react';
import { useStore } from '../store/useStore';
import { CreatePost } from './CreatePost';
import { Post } from './Post';

export function Feed() {
  const posts = useStore(state => state.posts);
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <CreatePost />
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}