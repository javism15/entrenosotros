'use client';

import Image from 'next/image';
import { useState } from 'react';
import { gameConfig } from '@/data/gameConfig';
import type { GameProgress, RoomConfig, RoomId } from '@/types/game';

export function MemoryDrawer({ progress, initialRoomId, onClose }: { progress: GameProgress; initialRoomId: RoomId; onClose: () => void }) {
  const [roomId, setRoomId] = useState<RoomId>(initialRoomId);
  const room: RoomConfig = gameConfig.rooms.find((item) => item.id === roomId) ?? gameConfig.rooms[0];
  const roomProgress = progress.rooms[room.id];
  const count = roomProgress.puzzles.filter(Boolean).length;
  return (
    <div className="overlay drawer-overlay" role="dialog" aria-modal="true" aria-labelledby="memories-title">
      <section className="memory-drawer"><div className="drawer-handle" /><button className="close-button" onClick={onClose} aria-label="Cerrar">×</button><p className="panel-kicker">Colección · {progress.secrets.length}/5 secretos</p><h2 id="memories-title">Nuestros recuerdos</h2>
        <div className="memory-room-tabs" aria-label="Habitaciones">{gameConfig.rooms.map((item) => <button key={item.id} className={item.id === room.id ? 'active' : ''} disabled={!progress.rooms[item.id].unlocked} onClick={() => setRoomId(item.id)}><span>{progress.rooms[item.id].puzzles.filter(Boolean).length}/5</span>{item.title}</button>)}</div>
        <p className="drawer-progress">{room.title} — {count}/5</p>
        <div className="memory-list">{room.memories.map((memory, index) => {
          const unlocked = roomProgress.puzzles[index];
          return <article key={memory.id} className={unlocked ? 'memory-unlocked' : 'memory-locked'}><div className="memory-image">{unlocked && memory.image ? <Image src={memory.image} alt={memory.imageAlt} fill sizes="80px" /> : <span>{unlocked ? String(index + 1).padStart(2, '0') : '⌑'}</span>}</div><div><small>Fragmento {index + 1}</small><h3>{unlocked ? memory.title : 'Recuerdo bloqueado'}</h3><p>{unlocked ? memory.description : 'Resuelve el enigma para revelar este recuerdo.'}</p>{unlocked && (memory.optionalDate || memory.optionalLocation) && <em>{[memory.optionalDate, memory.optionalLocation].filter(Boolean).join(' · ')}</em>}</div></article>;
        })}</div>
      </section>
    </div>
  );
}
