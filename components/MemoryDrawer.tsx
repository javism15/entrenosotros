import { gameConfig } from '@/data/gameConfig';

export function MemoryDrawer({ completed, onClose }: { completed: boolean[]; onClose: () => void }) {
  const count = completed.filter(Boolean).length;
  return (
    <div className="overlay drawer-overlay" role="dialog" aria-modal="true" aria-labelledby="memories-title">
      <section className="memory-drawer">
        <div className="drawer-handle" />
        <button className="close-button" onClick={onClose} aria-label="Cerrar">×</button>
        <p className="panel-kicker">Colección</p>
        <h2 id="memories-title">Nuestros recuerdos</h2>
        <p className="drawer-progress">Has recuperado {count} de 5 fragmentos</p>
        <div className="memory-list">
          {gameConfig.memories.map((memory, index) => (
            <article key={memory.title} className={completed[index] ? 'memory-unlocked' : 'memory-locked'}>
              <div className="memory-image"><span>{completed[index] ? memory.image : '⌑'}</span></div>
              <div><small>Fragmento {index + 1}</small><h3>{completed[index] ? memory.title : 'Recuerdo bloqueado'}</h3><p>{completed[index] ? memory.description : 'Resuelve el enigma para revelar este recuerdo.'}</p></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
