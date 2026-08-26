'use client';

import { useState } from 'react';
import type { PhonePuzzleConfig } from '@/types/game';

export function PhonePuzzle({ config, onSolve, onWrong }: { config: PhonePuzzleConfig; onSolve: () => void; onWrong?: () => void }) {
  const [app, setApp] = useState<PhonePuzzleConfig['targetApp'] | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  return (
    <div className="phone-frame">
      <div className="phone-status"><span>9:41</span><span>● ●</span></div>
      {!app ? (
        <div className="phone-apps">{config.apps.map((item) => <button key={item.id} onClick={() => setApp(item.id)}><span>{item.icon}</span><small>{item.label}</small></button>)}</div>
      ) : app !== config.targetApp ? (
        <div className="phone-empty"><button onClick={() => setApp(null)}>‹ Inicio</button><span>⌑</span><p>Aquí no está la pista que buscas.</p></div>
      ) : (
        <div className="phone-chat"><button onClick={() => setApp(null)}>‹ Inicio</button>{config.conversation.map((line) => <p key={line}>{line}</p>)}<h3>{config.question}</h3><div>{config.choices.map((choice) => <button key={choice} className={wrong === choice ? 'wrong-choice' : ''} onClick={() => { if (choice === config.correctChoice) onSolve(); else { setWrong(choice); onWrong?.(); } }}>{choice}</button>)}</div></div>
      )}
    </div>
  );
}
