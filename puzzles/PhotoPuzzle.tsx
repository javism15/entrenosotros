'use client';

import { useState } from 'react';

const solved = [1, 2, 3, 4, 5, 6, 7, 8, 0];
const start = [1, 2, 3, 4, 0, 6, 7, 5, 8];

export function PhotoPuzzle({ onSolve }: { onSolve: () => void }) {
  const [tiles, setTiles] = useState(start);
  const move = (index: number) => {
    const empty = tiles.indexOf(0);
    const adjacent = Math.abs(empty - index) === 3 || (Math.abs(empty - index) === 1 && Math.floor(empty / 3) === Math.floor(index / 3));
    if (!adjacent) return;
    const next = [...tiles]; [next[empty], next[index]] = [next[index], next[empty]];
    setTiles(next);
    if (next.every((tile, i) => tile === solved[i])) setTimeout(onSolve, 350);
  };
  return (
    <div className="photo-puzzle-wrap">
      <p>Desliza las piezas hasta completar la fotografía.</p>
      <div className="photo-grid" aria-label="Rompecabezas deslizante">
        {tiles.map((tile, index) => <button key={tile} className={tile === 0 ? 'empty-tile' : ''} onClick={() => move(index)} aria-label={tile ? `Pieza ${tile}` : 'Espacio vacío'}>{tile || ''}</button>)}
      </div>
      <button className="text-button" onClick={() => setTiles(start)}>Reiniciar piezas</button>
    </div>
  );
}
