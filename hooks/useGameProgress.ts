'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { User } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { gameConfig, roomOrder } from '@/data/gameConfig';
import { getFirebaseServices } from '@/lib/firebase';
import type { GameProgress, LegacyProgress, RoomId, RoomProgress } from '@/types/game';

const STORAGE_KEY = 'between-us-progress';
const LEGACY_PUZZLE_COUNT = 5;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export function createInitialProgress(): GameProgress {
  const rooms = Object.fromEntries(gameConfig.rooms.map((room, index) => [
    room.id,
    { unlocked: index === 0, completed: false, puzzles: room.puzzles.map(() => false) },
  ])) as Record<RoomId, RoomProgress>;
  return { version: 2, started: false, currentRoomId: 'beginning', rooms, secrets: [] };
}

function normalizeRooms(rawRooms: unknown): Record<RoomId, RoomProgress> {
  const initial = createInitialProgress().rooms;
  const source = isRecord(rawRooms) ? rawRooms : {};

  for (const room of gameConfig.rooms) {
    const roomValue = source[room.id];
    const raw: Record<string, unknown> = isRecord(roomValue) ? roomValue : {};
    const rawPuzzles = Array.isArray(raw.puzzles) ? raw.puzzles : [];
    const puzzles = room.puzzles.map((_, index) => Boolean(rawPuzzles[index]));
    initial[room.id] = {
      unlocked: room.id === 'beginning' || Boolean(raw.unlocked),
      completed: Boolean(raw.completed) || puzzles.every(Boolean),
      puzzles,
    };
  }

  roomOrder.forEach((roomId, index) => {
    if (index > 0 && initial[roomOrder[index - 1]].completed) initial[roomId].unlocked = true;
  });
  return initial;
}

function readLegacy(raw: Record<string, unknown>): LegacyProgress | null {
  if (!Array.isArray(raw.completed) || raw.completed.length !== LEGACY_PUZZLE_COUNT) return null;
  return { started: Boolean(raw.started), completed: raw.completed.map(Boolean) };
}

export function migrateProgress(raw: unknown): GameProgress {
  if (!isRecord(raw)) return createInitialProgress();

  if (raw.version === 2 && isRecord(raw.rooms)) {
    const currentRoomId = roomOrder.includes(raw.currentRoomId as RoomId)
      ? raw.currentRoomId as RoomId
      : 'beginning';
    const legacy = isRecord(raw.legacy) && Array.isArray(raw.legacy.completed)
      ? { started: Boolean(raw.legacy.started), completed: raw.legacy.completed.map(Boolean) }
      : undefined;
    return {
      version: 2,
      started: Boolean(raw.started),
      currentRoomId,
      rooms: normalizeRooms(raw.rooms),
      secrets: Array.isArray(raw.secrets) ? raw.secrets.filter((item): item is string => typeof item === 'string') : [],
      ...(legacy ? { legacy } : {}),
    };
  }

  const legacy = readLegacy(raw);
  if (!legacy) return createInitialProgress();
  const migrated = createInitialProgress();
  migrated.started = legacy.started;
  migrated.rooms.beginning.puzzles = legacy.completed;
  migrated.rooms.beginning.completed = legacy.completed.every(Boolean);
  migrated.rooms.adventures.unlocked = migrated.rooms.beginning.completed;
  migrated.legacy = legacy;
  return migrated;
}

export function mergeProgress(local: GameProgress, cloud: GameProgress | null): GameProgress {
  if (!cloud) return local;
  const rooms = createInitialProgress().rooms;
  for (const roomId of roomOrder) {
    const puzzles = rooms[roomId].puzzles.map((_, index) =>
      Boolean(local.rooms[roomId].puzzles[index] || cloud.rooms[roomId].puzzles[index]));
    rooms[roomId] = {
      unlocked: local.rooms[roomId].unlocked || cloud.rooms[roomId].unlocked,
      completed: local.rooms[roomId].completed || cloud.rooms[roomId].completed || puzzles.every(Boolean),
      puzzles,
    };
  }
  roomOrder.forEach((roomId, index) => {
    if (index > 0 && rooms[roomOrder[index - 1]].completed) rooms[roomId].unlocked = true;
  });
  return {
    version: 2,
    started: local.started || cloud.started,
    currentRoomId: cloud.started ? cloud.currentRoomId : local.currentRoomId,
    rooms,
    secrets: [...new Set([...local.secrets, ...cloud.secrets])],
    legacy: local.legacy ?? cloud.legacy,
  };
}

function readLocalProgress(): GameProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? migrateProgress(JSON.parse(saved)) : createInitialProgress();
  } catch {
    return createInitialProgress();
  }
}

export function useGameProgress(user: User | null) {
  const [progress, setProgress] = useState<GameProgress>(createInitialProgress);
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
          const cloud = snapshot.exists() ? migrateProgress(snapshot.data()) : null;
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

  const start = useCallback(() => {
    setProgress((current) => ({ ...current, started: true, currentRoomId: 'beginning' }));
  }, []);

  const setCurrentRoom = useCallback((roomId: RoomId) => {
    setProgress((current) => current.rooms[roomId].unlocked
      ? { ...current, currentRoomId: roomId }
      : current);
  }, []);

  const completePuzzle = useCallback((roomId: RoomId, puzzleIndex: number) => {
    setProgress((current) => {
      const puzzles = current.rooms[roomId].puzzles.map((done, index) => index === puzzleIndex ? true : done);
      const completed = puzzles.every(Boolean);
      const rooms = { ...current.rooms, [roomId]: { ...current.rooms[roomId], puzzles, completed } };
      const roomIndex = roomOrder.indexOf(roomId);
      const nextRoom = roomOrder[roomIndex + 1];
      if (completed && nextRoom) rooms[nextRoom] = { ...rooms[nextRoom], unlocked: true };
      return { ...current, currentRoomId: roomId, rooms };
    });
  }, []);

  const findSecret = useCallback((secretId: string) => {
    setProgress((current) => current.secrets.includes(secretId)
      ? current
      : { ...current, secrets: [...current.secrets, secretId] });
  }, []);

  const reset = useCallback(async () => {
    const next = createInitialProgress();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setProgress(next);
    const services = getFirebaseServices();
    if (user && services) {
      await setDoc(doc(services.db, 'gameProgress', user.uid), {
        ...next,
        completed: [false, false, false, false, false],
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }
  }, [user]);

  return { progress, ready, start, setCurrentRoom, completePuzzle, findSecret, reset };
}
