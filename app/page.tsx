'use client';

import { useState } from 'react';
import { EndingScreen } from '@/components/EndingScreen';
import { MainMenu } from '@/components/MainMenu';
import { MemoryDrawer } from '@/components/MemoryDrawer';
import { MemoryReveal } from '@/components/MemoryReveal';
import { RoomScreen } from '@/components/RoomScreen';
import { gameConfig, puzzleDetails } from '@/data/gameConfig';
import { useGameProgress } from '@/hooks/useGameProgress';
import { ChoicePuzzle } from '@/puzzles/ChoicePuzzle';
import { CodePuzzle } from '@/puzzles/CodePuzzle';
import { PhotoPuzzle } from '@/puzzles/PhotoPuzzle';
import { PuzzleShell } from '@/puzzles/PuzzleShell';

type Screen = 'menu' | 'room' | 'ending';

export default function Home() {
  const { progress, ready, start, completePuzzle } = useGameProgress();
  const [screen, setScreen] = useState<Screen>('menu');
  const [activePuzzle, setActivePuzzle] = useState<number | null>(null);
  const [reveal, setReveal] = useState<number | null>(null);
  const [memoriesOpen, setMemoriesOpen] = useState(false);
  const [prologue, setPrologue] = useState(false);

  const begin = () => { start(); setScreen('room'); setPrologue(true); };
  const solve = (index: number) => {
    completePuzzle(index);
    setActivePuzzle(null);
    setTimeout(() => setReveal(index), 180);
  };
  const openPuzzle = (index: number) => progress.completed[index] ? setReveal(index) : setActivePuzzle(index);

  if (!ready) return <main className="game-shell loading-screen"><span className="loading-heart">♡</span></main>;

  return (
    <>
      {screen === 'menu' && <MainMenu canContinue={progress.started} onStart={begin} onContinue={() => setScreen('room')} />}
      {screen === 'room' && <RoomScreen completed={progress.completed} onPuzzle={openPuzzle} onMemories={() => setMemoriesOpen(true)} onChest={() => progress.completed.every(Boolean) && setScreen('ending')} onMenu={() => setScreen('menu')} />}
      {screen === 'ending' && <EndingScreen onMemories={() => setMemoriesOpen(true)} />}

      {prologue && (
        <div className="overlay prologue-overlay" role="dialog" aria-modal="true" aria-labelledby="prologue-title">
          <section className="prologue-card">
            <span className="prologue-icon">⌑</span>
            <p className="panel-kicker">Una voz en la oscuridad</p>
            <h2 id="prologue-title">{gameConfig.playerName}, nuestros recuerdos han quedado encerrados.</h2>
            <p>Esta habitación guarda cinco fragmentos de nuestra historia. Encuéntralos. Recuérdanos.</p>
            <button className="primary-button" onClick={() => setPrologue(false)}>Entrar en la habitación</button>
          </section>
        </div>
      )}

      {activePuzzle !== null && (
        <PuzzleShell title={puzzleDetails[activePuzzle].title} hint={puzzleDetails[activePuzzle].hint} onClose={() => setActivePuzzle(null)}>
          {activePuzzle === 0 && <CodePuzzle answer={gameConfig.importantDate} label="Introduce una fecha de cuatro cifras" onSolve={() => solve(0)} />}
          {activePuzzle === 1 && <ChoicePuzzle options={gameConfig.songs} answer={gameConfig.correctSong} symbol="♪" onSolve={() => solve(1)} />}
          {activePuzzle === 2 && <ChoicePuzzle options={gameConfig.locations} answer={gameConfig.correctLocation} symbol="⌖" onSolve={() => solve(2)} />}
          {activePuzzle === 3 && <PhotoPuzzle onSolve={() => solve(3)} />}
          {activePuzzle === 4 && <><div className="clue-strip"><span>Fecha</span><b>{gameConfig.importantDate.slice(0, 2)}</b><span>Fragmentos</span><b>0{progress.completed.slice(0, 4).filter(Boolean).length}</b></div><CodePuzzle answer={gameConfig.finalCode} label="Introduce el código final" onSolve={() => solve(4)} /></>}
        </PuzzleShell>
      )}
      {reveal !== null && <MemoryReveal index={reveal} onClose={() => setReveal(null)} />}
      {memoriesOpen && <MemoryDrawer completed={progress.completed} onClose={() => setMemoriesOpen(false)} />}
    </>
  );
}
