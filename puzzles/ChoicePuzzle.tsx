'use client';

import { useState } from 'react';

export function ChoicePuzzle({ options, answer, onSolve, symbol }: { options: readonly string[]; answer: string; onSolve: () => void; symbol: string }) {
  const [wrong, setWrong] = useState<string | null>(null);
  return (
    <div className="choice-list">
      {options.map((option, index) => (
        <button key={option} className={wrong === option ? 'wrong-choice' : ''} onClick={() => option === answer ? onSolve() : setWrong(option)}>
          <span className="choice-symbol">{symbol}</span><span><small>Opción {index + 1}</small>{option}</span><b>›</b>
        </button>
      ))}
      {wrong && <p className="error-text">Ese recuerdo suena distinto…</p>}
    </div>
  );
}
