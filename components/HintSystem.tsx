'use client';

import { useState } from 'react';

export function HintSystem({ hints, attempts }: { hints?: readonly string[]; attempts: number }) {
  const [revealed, setRevealed] = useState(0);
  if (!hints?.length || attempts < 2) return null;
  const canReveal = revealed < hints.length;
  return (
    <aside className="hint-system" aria-live="polite">
      {revealed === 0 && <p>¿Quieres una pista?</p>}
      {hints.slice(0, revealed).map((hint, index) => <p key={`${hint}-${index}`}><b>Pista {index + 1}</b>{hint}</p>)}
      {canReveal && <button type="button" className="text-button" onClick={() => setRevealed((count) => count + 1)}>{revealed ? 'Revelar otra pista' : 'Mostrar una pista'}</button>}
    </aside>
  );
}
