export interface User {
  id: string;
  name: string;
  color: string;
  cursor?: {
    index: number;
    selection: { start: number; end: number } | null;
  };
}

export interface Document {
  id: string;
  title: string;
  content: string;
  users: User[];
  createdAt: string;
  updatedAt: string;
}