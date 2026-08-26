import Image from 'next/image';
import { AudioMessage } from '@/components/AudioMessage';
import type { RoomConfig } from '@/types/game';

export function MemoryReveal({ room, index, onClose }: { room: RoomConfig; index: number; onClose: () => void }) {
  const memory = room.memories[index];
  return (
    <div className="overlay reveal-overlay" role="dialog" aria-modal="true" aria-labelledby="reveal-title"><section className="memory-reveal"><div className="spark spark-one">✦</div><div className="spark spark-two">✦</div><p className="panel-kicker">{room.title} · Fragmento {index + 1}/5</p><div className="reveal-image">{memory.image ? <Image src={memory.image} alt={memory.imageAlt} fill sizes="150px" priority /> : <span>{String(index + 1).padStart(2, '0')}</span>}<i>♡</i></div><h2 id="reveal-title">{memory.title}</h2><p>{memory.description}</p>{memory.optionalExtraText && <blockquote>{memory.optionalExtraText}</blockquote>}{memory.audio && <AudioMessage src={memory.audio} label={`Audio de ${memory.title}`} />}<button className="primary-button" onClick={onClose}>Guardar recuerdo</button></section></div>
  );
}
