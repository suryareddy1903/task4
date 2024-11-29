import React from 'react';
import { Home, Bell, User, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Header() {
  const currentUser = useStore(state => state.currentUser);
  
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">SocialHub</h1>
        
        <nav className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Home size={24} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell size={24} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <User size={24} />
          </button>
          {currentUser && (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
        </nav>
      </div>
    </header>
  );
}