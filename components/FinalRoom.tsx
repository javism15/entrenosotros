'use client';

import { useState } from 'react';
import { AudioMessage } from '@/components/AudioMessage';
import { gameConfig } from '@/data/gameConfig';

export function FinalRoom({ allSecrets, onMemories, onSecretGallery, onHub }: { allSecrets: boolean; onMemories: () => void; onSecretGallery: () => void; onHub: () => void }) {
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const messages = gameConfig.final.messages;
  return (
    <main className="final-room" style={gameConfig.final.backgroundImage ? { backgroundImage: `linear-gradient(#090b18aa,#090b18ee),url(${gameConfig.final.backgroundImage})` } : undefined}>
      <div className="final-constellation" aria-hidden="true">✦ · ✧ · ✦ · ✧ · ✦</div><button className="round-button final-back" onClick={onHub} aria-label="Volver al pasillo">‹</button>
      {!revealed ? <section className="final-sequence"><p className="panel-kicker">La sexta puerta</p><h1>{messages[step]}</h1>{step < messages.length - 1 ? <button className="secondary-button" onClick={() => setStep((value) => value + 1)}>Continuar</button> : <><button className="heart-button" onClick={() => setRevealed(true)} aria-label="Abrir el mensaje final">♥</button><small>Toca el corazón</small></>}</section> : <section className="final-message"><p className="panel-kicker">Para {gameConfig.couple.playerName}</p><div className="final-letters" aria-label="Carla">{gameConfig.rooms.map((room) => <span key={room.id}>{room.reward.letter}</span>)}</div><blockquote>“{gameConfig.final.finalMessage}”</blockquote><p>— {gameConfig.couple.partnerName}</p>{gameConfig.final.audio && <AudioMessage src={gameConfig.final.audio} label="Mensaje final" />}<button className="secondary-button" onClick={onMemories}>Ver todos nuestros recuerdos</button>{allSecrets && <button className="secret-more-button" onClick={onSecretGallery}>Hay algo más…</button>}</section>}
    </main>
  );
}
