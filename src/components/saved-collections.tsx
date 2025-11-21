'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface SavedCollection {
  id: string;
  name: string;
  prompts: string[];
  createdAt: string;
}

interface SavedCollectionsProps {
  isPro: boolean;
}

export function SavedCollections({ isPro }: SavedCollectionsProps) {
  const [collections, setCollections] = useState<SavedCollection[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('promptpedia_collections');
    return saved ? JSON.parse(saved) : [];
  });

  const saveCollection = (name: string, promptIds: string[]) => {
    const newCollection: SavedCollection = {
      id: Date.now().toString(),
      name,
      prompts: promptIds,
      createdAt: new Date().toISOString(),
    };
    const updated = [...collections, newCollection];
    setCollections(updated);
    localStorage.setItem('promptpedia_collections', JSON.stringify(updated));
    return newCollection;
  };

  const deleteCollection = (id: string) => {
    const updated = collections.filter(c => c.id !== id);
    setCollections(updated);
    localStorage.setItem('promptpedia_collections', JSON.stringify(updated));
  };

  if (!isPro || collections.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200"
    >
      <h3 className="font-bold text-lg mb-4 text-slate-900">Your Collections</h3>
      <div className="space-y-3">
        {collections.map((collection) => (
          <div key={collection.id} className="flex items-center justify-between bg-white p-4 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">{collection.name}</p>
              <p className="text-sm text-slate-600">{collection.prompts.length} prompts</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => deleteCollection(collection.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
