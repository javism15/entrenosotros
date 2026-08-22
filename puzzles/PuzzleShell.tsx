import type { ReactNode } from 'react';

export function PuzzleShell({ title, hint, children, onClose }: { title: string; hint: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="puzzle-title">
      <section className="puzzle-panel">
        <button className="close-button" onClick={onClose} aria-label="Cerrar">×</button>
        <p className="panel-kicker">Fragmento bloqueado</p>
        <h2 id="puzzle-title">{title}</h2>
        <p className="puzzle-hint">“{hint}”</p>
        {children}
      </section>
    </div>
  );
}
