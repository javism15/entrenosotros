'use client';

import { useState } from 'react';
import { gameConfig } from '@/data/gameConfig';

export function EndingScreen({ onMemories }: { onMemories: () => void }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <main className="ending-screen">
      <div className="ending-stars" aria-hidden="true">✦　·　✧　·　✦</div>
      <div className={`ending-heart ${revealed ? 'heart-open' : ''}`}>♡</div>
      {!revealed ? (
        <section className="ending-copy">
          <p className="panel-kicker">La habitación vuelve a tener luz</p>
          <h1>Has recuperado todos nuestros recuerdos.</h1>
          <p>Pero todavía nos quedan muchos por crear.</p>
          <button className="heart-button" onClick={() => setRevealed(true)} aria-label="Revelar mensaje final">♥</button>
          <small>Toca el corazón</small>
        </section>
      ) : (
        <section className="final-message">
          <p className="panel-kicker">Para {gameConfig.playerName}</p>
          <blockquote>“{gameConfig.finalMessage}”</blockquote>
          <p>— {gameConfig.partnerName}</p>
          <button className="secondary-button" onClick={onMemories}>Volver a nuestros recuerdos</button>
        </section>
      )}
    </main>
  );
}
