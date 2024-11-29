import React, { useEffect, useRef } from 'react';
import { Users } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

export function Editor() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { doc, currentUser, activeUsers, updateCursor } = useEditorStore();
  const text = doc.getText('content');

  useEffect(() => {
    const observer = (event: Y.YTextEvent) => {
      if (textareaRef.current) {
        const newValue = text.toString();
        textareaRef.current.value = newValue;
      }
    };

    text.observe(observer);
    return () => text.unobserve(observer);
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const delta = e.target.value.length - text.length;
    const pos = e.target.selectionStart;
    text.delete(0, text.length);
    text.insert(0, e.target.value);
    updateCursor(pos + delta, {
      start: e.target.selectionStart,
      end: e.target.selectionEnd
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Collaborative Editor</h1>
          <div className="flex items-center gap-2">
            <Users className="text-gray-500" />
            <span className="text-sm text-gray-600">
              {activeUsers.length} active user{activeUsers.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b px-6 py-4">
            <div className="flex items-center gap-2">
              {activeUsers.map(user => (
                <div
                  key={user.id}
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: `${user.color}20`, color: user.color }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: user.color }} />
                  {user.name}
                </div>
              ))}
            </div>
          </div>
          <textarea
            ref={textareaRef}
            onChange={handleChange}
            className="w-full h-[calc(100vh-16rem)] p-6 focus:outline-none resize-none"
            placeholder="Start typing..."
          />
        </div>
      </main>
    </div>
  );
}