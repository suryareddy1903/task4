import { create } from 'zustand';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { User, Document } from '../types/editor';

interface EditorStore {
  doc: Y.Doc;
  provider: WebsocketProvider | null;
  currentUser: User | null;
  activeUsers: User[];
  document: Document | null;
  connect: (username: string) => void;
  disconnect: () => void;
  updateCursor: (index: number, selection: { start: number; end: number } | null) => void;
}

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
];

// Get the current hostname and port from the window location
const wsUrl = window.location.hostname === 'localhost' 
  ? 'ws://localhost:3001' 
  : `wss://${window.location.hostname}`;

export const useEditorStore = create<EditorStore>((set, get) => ({
  doc: new Y.Doc(),
  provider: null,
  currentUser: null,
  activeUsers: [],
  document: null,

  connect: (username) => {
    const { doc } = get();
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const user: User = {
      id: crypto.randomUUID(),
      name: username,
      color,
      cursor: { index: 0, selection: null }
    };

    const provider = new WebsocketProvider(
      wsUrl,
      'collaborative-editor',
      doc,
      { connect: true }
    );

    provider.awareness.setLocalState({ user });

    provider.awareness.on('change', () => {
      const states = Array.from(provider.awareness.getStates().values());
      set({ activeUsers: states.map(state => state.user) });
    });

    set({ provider, currentUser: user });
  },

  disconnect: () => {
    const { provider } = get();
    if (provider) {
      provider.disconnect();
      set({ provider: null, currentUser: null });
    }
  },

  updateCursor: (index, selection) => {
    const { provider, currentUser } = get();
    if (provider && currentUser) {
      const newUser = {
        ...currentUser,
        cursor: { index, selection }
      };
      provider.awareness.setLocalState({ user: newUser });
    }
  }
}));