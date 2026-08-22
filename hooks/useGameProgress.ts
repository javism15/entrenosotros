'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'between-us-progress';

export type GameProgress = { started: boolean; completed: boolean[] };
const initialProgress: GameProgress = { started: false, completed: [false, false, false, false, false] };

export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgress>(initialProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as GameProgress;
        if (Array.isArray(parsed.completed) && parsed.completed.length === 5) setProgress(parsed);
      }
    } catch { /* A damaged save simply starts fresh. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && progress.started) localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress, ready]);

  const start = useCallback(() => setProgress({ ...initialProgress, started: true }), []);
  const completePuzzle = useCallback((index: number) => {
    setProgress((current) => ({ ...current, completed: current.completed.map((done, i) => i === index ? true : done) }));
  }, []);
  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(initialProgress);
  }, []);

  return { progress, ready, start, completePuzzle, reset };
}
