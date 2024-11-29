import { User, Post } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    bio: 'Software developer by day, gamer by night',
    followers: ['2', '3'],
    following: ['2']
  },
  {
    id: '2',
    name: 'Jane Smith',
    username: 'janesmith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Digital artist & photographer',
    followers: ['1'],
    following: ['1', '3']
  },
  {
    id: '3',
    name: 'Alex Johnson',
    username: 'alexj',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    bio: 'Travel enthusiast | Food lover',
    followers: ['2'],
    following: ['1']
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Just launched my new portfolio website! Check it out 🚀',
    image: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58',
    likes: ['2', '3'],
    comments: [
      {
        id: '1',
        userId: '2',
        content: 'Looks amazing! Great work!',
        createdAt: '2024-03-10T15:30:00Z'
      }
    ],
    createdAt: '2024-03-10T15:00:00Z'
  },
  {
    id: '2',
    userId: '2',
    content: 'Beautiful sunset at the beach today 🌅',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    likes: ['1'],
    comments: [],
    createdAt: '2024-03-10T14:00:00Z'
  }
];