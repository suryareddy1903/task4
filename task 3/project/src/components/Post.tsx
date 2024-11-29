import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Post as PostType } from '../types';
import { useStore } from '../store/useStore';

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { users, currentUser, toggleLike, addComment } = useStore();
  
  const author = users.find(user => user.id === post.userId)!;
  const isLiked = currentUser ? post.likes.includes(currentUser.id) : false;
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    addComment(post.id, newComment);
    setNewComment('');
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{author.name}</h3>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        <p className="mb-4">{post.content}</p>
        
        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="rounded-lg mb-4 w-full object-cover max-h-96"
          />
        )}
        
        <div className="flex items-center justify-between text-gray-500">
          <button
            onClick={() => currentUser && toggleLike(post.id)}
            className={`flex items-center space-x-2 ${
              isLiked ? 'text-red-500' : ''
            }`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{post.likes.length}</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2"
          >
            <MessageCircle size={20} />
            <span>{post.comments.length}</span>
          </button>
          
          <button className="flex items-center space-x-2">
            <Share2 size={20} />
          </button>
        </div>
      </div>
      
      {showComments && (
        <div className="border-t p-4">
          {currentUser && (
            <form onSubmit={handleAddComment} className="mb-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
          )}
          
          {post.comments.map(comment => {
            const commentAuthor = users.find(user => user.id === comment.userId)!;
            return (
              <div key={comment.id} className="flex items-start space-x-3 mb-3">
                <img
                  src={commentAuthor.avatar}
                  alt={commentAuthor.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <h4 className="font-semibold">{commentAuthor.name}</h4>
                    <p>{comment.content}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}