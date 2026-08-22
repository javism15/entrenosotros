import { gameConfig } from '@/data/gameConfig';

export function MemoryReveal({ index, onClose }: { index: number; onClose: () => void }) {
  const memory = gameConfig.memories[index];
  return (
    <div className="overlay reveal-overlay" role="dialog" aria-modal="true" aria-labelledby="reveal-title">
      <section className="memory-reveal">
        <div className="spark spark-one">✦</div><div className="spark spark-two">✦</div>
        <p className="panel-kicker">Fragmento recuperado · {index + 1}/5</p>
        <div className="reveal-image"><span>{memory.image}</span><i>♡</i></div>
        <h2 id="reveal-title">{memory.title}</h2>
        <p>{memory.description}</p>
        <button className="primary-button" onClick={onClose}>Guardar recuerdo</button>
      </section>
    </div>
  );
}
