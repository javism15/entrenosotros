import type { RoomConfig } from '@/types/game';

export function RoomCompleteReveal({ room, onContinue }: { room: RoomConfig; onContinue: () => void }) {
  return <div className="overlay reward-overlay" role="dialog" aria-modal="true" aria-labelledby="reward-title"><section className={`reward-card reward-${room.theme}`}><p className="panel-kicker">Habitación completada</p><span className="reward-letter">{room.reward.letter}</span><h2 id="reward-title">Has recuperado una pieza</h2><p>{room.reward.message}</p>{room.completionMessages?.map((message) => <blockquote key={message}>{message}</blockquote>)}<button className="primary-button" onClick={onContinue}>Volver al pasillo</button></section></div>;
}
