'use client';

import { useState } from 'react';

export function CodePuzzle({ answer, label, onSolve, onWrong }: { answer: string; label: string; onSolve: () => void; onWrong?: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const submit = () => {
    if (value === answer) onSolve();
    else { setError(true); setValue(''); onWrong?.(); }
  };
  return (
    <div className="puzzle-body">
      <label className="sr-only" htmlFor="code-input">{label}</label>
      <div className={`code-display ${error ? 'shake' : ''}`}>{[0, 1, 2, 3].map((i) => <span key={i}>{value[i] ?? '·'}</span>)}</div>
      <input id="code-input" className="hidden-code-input" inputMode="numeric" pattern="[0-9]*" maxLength={4} value={value} onChange={(event) => { setError(false); setValue(event.target.value.replace(/\D/g, '')); }} autoFocus />
      <div className="keypad" aria-label="Teclado numérico">
        {[1,2,3,4,5,6,7,8,9].map((number) => <button key={number} onClick={() => value.length < 4 && setValue(value + number)}>{number}</button>)}
        <button aria-label="Borrar" onClick={() => setValue(value.slice(0, -1))}>⌫</button>
        <button onClick={() => value.length < 4 && setValue(value + '0')}>0</button>
        <button className="key-confirm" aria-label="Comprobar" onClick={submit}>↵</button>
      </div>
      {error && <p className="error-text" role="alert">La cerradura no responde. Prueba otra vez.</p>}
    </div>
  );
}
