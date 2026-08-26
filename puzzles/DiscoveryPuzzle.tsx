'use client';

import { useState } from 'react';

export function DiscoveryPuzzle({ question, choices, correctChoice, revelation, onSolve, onWrong }: { question: string; choices: readonly string[]; correctChoice: string; revelation: string; onSolve: () => void; onWrong?: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [discovered, setDiscovered] = useState(false);
  const choose = (choice: string) => {
    setSelected(choice);
    if (choice === correctChoice) setDiscovered(true);
    else onWrong?.();
  };
  if (discovered) return <div className="discovery-revelation"><span>♡</span><p>{revelation}</p><button className="primary-button" onClick={onSolve}>Guardar este descubrimiento</button></div>;
  return (
    <div className="discovery-puzzle">
      <p>{question}</p>
      <div className="choice-list">{choices.map((choice) => <button key={choice} className={selected === choice ? 'wrong-choice' : ''} onClick={() => choose(choice)}><span className="choice-symbol">◇</span><span>{choice}</span><b>›</b></button>)}</div>
    </div>
  );
}
