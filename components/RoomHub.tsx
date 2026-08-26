import { gameConfig, roomOrder } from '@/data/gameConfig';
import type { GameProgress, RoomId } from '@/types/game';

function roomStatus(progress: GameProgress, roomId: RoomId) {
  const room = progress.rooms[roomId];
  if (!room.unlocked) return 'Bloqueada';
  if (room.completed) return 'Completada';
  if (room.puzzles.some(Boolean)) return 'En progreso';
  return 'Disponible';
}

export function RoomHub({ progress, onRoom, onMemories, onFinal, onMenu }: { progress: GameProgress; onRoom: (roomId: RoomId) => void; onMemories: () => void; onFinal: () => void; onMenu: () => void }) {
  const allCompleted = roomOrder.every((roomId) => progress.rooms[roomId].completed);
  return (
    <main className="hub-screen">
      <header className="room-hud hub-hud"><button className="round-button" onClick={onMenu} aria-label="Volver al menú">‹</button><div><span>El pasillo</span><strong>Elige una puerta</strong></div><button className="round-button" onClick={onMemories} aria-label="Abrir recuerdos">◇</button></header>
      <section className="hub-corridor" aria-labelledby="hub-title">
        <div className="hub-heading"><p className="panel-kicker">Cinco capítulos</p><h1 id="hub-title">Nuestro pasillo</h1><p>Cada puerta guarda una parte distinta de nosotros.</p></div>
        <div className="letter-lock" aria-label="Piezas de las habitaciones">{gameConfig.rooms.map((room) => <span key={room.id} className={progress.rooms[room.id].completed ? 'letter-found' : ''}>{progress.rooms[room.id].completed ? room.reward.letter : '·'}</span>)}</div>
        <div className="door-list">
          {gameConfig.rooms.map((room, index) => {
            const state = roomStatus(progress, room.id);
            const count = progress.rooms[room.id].puzzles.filter(Boolean).length;
            return <button key={room.id} className={`room-door door-${room.theme} ${state === 'Bloqueada' ? 'door-locked' : ''} ${state === 'Completada' ? 'door-complete' : ''}`} disabled={state === 'Bloqueada'} onClick={() => onRoom(room.id)}><span className="door-number">0{index + 1}</span><span><small>{state}</small><strong>{room.title}</strong><em>{room.subtitle}</em></span><b>{state === 'Bloqueada' ? '⌑' : state === 'Completada' ? room.reward.letter : `${count}/5`}</b></button>;
          })}
          {allCompleted && <button className="room-door final-door" onClick={onFinal}><span className="door-number">06</span><span><small>La última puerta</small><strong>?</strong><em>Algo estaba esperando detrás de todos los recuerdos.</em></span><b>♡</b></button>}
        </div>
      </section>
    </main>
  );
}
