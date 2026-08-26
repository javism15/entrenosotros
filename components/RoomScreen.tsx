import { SecretCollectible } from '@/components/SecretCollectible';
import type { RoomConfig, RoomProgress } from '@/types/game';

export function RoomScreen({ room, progress, secretFound, onPuzzle, onSecret, onMemories, onChest, onHub }: { room: RoomConfig; progress: RoomProgress; secretFound: boolean; onPuzzle: (index: number) => void; onSecret: () => void; onMemories: () => void; onChest: () => void; onHub: () => void }) {
  const count = progress.puzzles.filter(Boolean).length;
  return (
    <main className={`room-screen room-theme-${room.theme}`}>
      <header className="room-hud"><button className="round-button" onClick={onHub} aria-label="Volver al pasillo">‹</button><div><span>{room.title}</span><strong>{count} / 5 recuerdos</strong></div><button className="round-button" onClick={onMemories} aria-label="Abrir recuerdos">◇</button></header>
      <section className="room-scene" aria-label={`Habitación ${room.title}`}>
        <div className="room-backdrop"><i /><i /><i /><i /></div><div className="light-cone" /><div className="floor-lines" /><div className="room-furniture"><span /><span /></div>
        {room.theme === 'future' && <div className={`future-fill future-fill-${count}`} aria-hidden="true">{Array.from({ length: count }, (_, index) => <i key={index}>✦</i>)}</div>}
        <SecretCollectible symbol={room.secret.symbol} label={room.secret.label} found={secretFound} onFind={onSecret} />
        <div className={`final-chest ${progress.completed ? 'chest-ready' : ''}`}><button onClick={onChest} aria-label={progress.completed ? 'Abrir recompensa de la habitación' : 'Recompensa bloqueada'}><span>{progress.completed ? room.reward.letter : '⌑'}</span></button><small>{progress.completed ? 'RECOMPENSA' : `${count}/5`}</small></div>
        {room.objects.map((object, index) => {
          const unavailable = index === 4 && count < 4 && !progress.puzzles[4];
          return <button key={object.label} className={`room-object object-${object.position} ${progress.puzzles[index] ? 'object-done' : ''}`} onClick={() => !unavailable && onPuzzle(index)} aria-label={`${object.label}${progress.puzzles[index] ? ', recuerdo recuperado' : unavailable ? ', bloqueado' : ''}`}><span>{progress.puzzles[index] ? '✓' : unavailable ? '⌑' : object.icon}</span><small>{object.label}</small></button>;
        })}
        <p className="room-whisper">{count === 0 ? room.intro : count < 4 ? 'La habitación empieza a transformarse.' : count < 5 ? 'El último objeto ya puede responder.' : 'La recompensa te está esperando.'}</p>
      </section>
      <nav className="game-dock" aria-label="Acciones del juego"><button onClick={onMemories}><span>◇</span><small>Recuerdos</small><b>{count}</b></button><div className="dock-clue"><span>{room.subtitle}</span></div></nav>
    </main>
  );
}
