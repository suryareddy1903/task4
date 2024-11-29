import React, { useState } from 'react';
import { Image } from 'lucide-react';
import { useStore } from '../store/useStore';

export function CreatePost() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const createPost = useStore(state => state.createPost);
  const currentUser = useStore(state => state.currentUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    createPost(content, image);
    setContent('');
    setImage('');
  };

  if (!currentUser) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-1 resize-none border rounded-lg p-2 h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {image && (
          <div className="mt-2">
            <img
              src={image}
              alt="Post preview"
              className="max-h-60 rounded-lg object-cover"
            />
          </div>
        )}
        
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setImage('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba')}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
          >
            <Image size={20} />
            <span>Add Image</span>
          </button>
          
          <button
            type="submit"
            disabled={!content.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}