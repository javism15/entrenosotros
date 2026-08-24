'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { User } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getFirebaseServices } from '@/lib/firebase';

const STORAGE_KEY = 'between-us-progress';

export type GameProgress = { started: boolean; completed: boolean[] };
const initialProgress: GameProgress = { started: false, completed: [false, false, false, false, false] };

function readLocalProgress(): GameProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialProgress;
    const parsed = JSON.parse(saved) as GameProgress;
    if (Array.isArray(parsed.completed) && parsed.completed.length === 5) return parsed;
  } catch { /* A damaged save simply starts fresh. */ }
  return initialProgress;
}

function mergeProgress(local: GameProgress, cloud: GameProgress | null): GameProgress {
  if (!cloud) return local;
  return {
    started: local.started || cloud.started,
    completed: local.completed.map((done, index) => done || Boolean(cloud.completed[index])),
  };
}

export function useGameProgress(user: User | null) {
  const [progress, setProgress] = useState<GameProgress>(initialProgress);
  const [ready, setReady] = useState(false);
  const hydratedUser = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function hydrate() {
      setReady(false);
      const local = readLocalProgress();
      let next = local;
      const services = getFirebaseServices();

      if (user && services) {
        try {
          const snapshot = await getDoc(doc(services.db, 'gameProgress', user.uid));
          const data = snapshot.exists() ? snapshot.data() as Partial<GameProgress> : null;
          const cloud = data && Array.isArray(data.completed) && data.completed.length === 5
            ? { started: Boolean(data.started), completed: data.completed.map(Boolean) }
            : null;
          next = mergeProgress(local, cloud);
        } catch {
          next = local;
        }
      }

      if (!cancelled) {
        hydratedUser.current = user?.uid ?? 'anonymous';
        setProgress(next);
        setReady(true);
      }
    }
    void hydrate();
    return () => { cancelled = true; };
  }, [user]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    const services = getFirebaseServices();
    if (!user || !services || hydratedUser.current !== user.uid) return;
    void setDoc(doc(services.db, 'gameProgress', user.uid), {
      ...progress,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }, [progress, ready, user]);

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

