import { puzzleDetails } from '@/data/gameConfig';

const objects = [
  { icon: '▣', className: 'object-box' },
  { icon: '♫', className: 'object-radio' },
  { icon: '⌖', className: 'object-map' },
  { icon: '▧', className: 'object-photo' },
  { icon: '◷', className: 'object-clock' },
];

export function RoomScreen({ completed, onPuzzle, onMemories, onChest, onMenu }: { completed: boolean[]; onPuzzle: (index: number) => void; onMemories: () => void; onChest: () => void; onMenu: () => void }) {
  const count = completed.filter(Boolean).length;
  return (
    <main className="room-screen">
      <header className="room-hud">
        <button className="round-button" onClick={onMenu} aria-label="Volver al menú">‹</button>
        <div><span>La habitación</span><strong>{count} / 5 recuerdos</strong></div>
        <button className="round-button" onClick={onMemories} aria-label="Abrir recuerdos">◇</button>
      </header>
      <section className="room-scene" aria-label="Habitación misteriosa">
        <div className="window"><i /><i /><i /><i /></div>
        <div className="light-cone" />
        <div className="floor-lines" />
        <div className="cabinet"><span /><span /></div>
        <div className={`final-chest ${count === 5 ? 'chest-ready' : ''}`}>
          <button onClick={onChest} aria-label={count === 5 ? 'Abrir cofre final' : 'Cofre final bloqueado'}><span>{count === 5 ? '♡' : '⌑'}</span></button>
          <small>{count === 5 ? 'ÁBREME' : `${count}/5`}</small>
        </div>
        {objects.map((object, index) => {
          const unavailable = index === 4 && count < 4 && !completed[4];
          return (
            <button key={object.className} className={`room-object ${object.className} ${completed[index] ? 'object-done' : ''}`} onClick={() => !unavailable && onPuzzle(index)} aria-label={`${puzzleDetails[index].object}${completed[index] ? ', recuerdo recuperado' : unavailable ? ', bloqueado' : ''}`}>
              <span>{completed[index] ? '✓' : unavailable ? '⌑' : object.icon}</span><small>{puzzleDetails[index].object}</small>
            </button>
          );
        })}
        <p className="room-whisper">Toca los objetos para buscar pistas</p>
      </section>
      <nav className="game-dock" aria-label="Acciones del juego">
        <button onClick={onMemories}><span>◇</span><small>Recuerdos</small><b>{count}</b></button>
        <div className="dock-clue"><span>{count === 0 ? '“Empieza donde guardamos las fechas.”' : count < 4 ? '“La habitación empieza a recordarte.”' : count < 5 ? '“El reloj conoce la última clave.”' : '“El cofre te está esperando.”'}</span></div>
      </nav>
    </main>
  );
}
