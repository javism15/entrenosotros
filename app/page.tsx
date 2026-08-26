'use client';

import { useState } from 'react';
import { AuthScreen } from '@/components/AuthScreen';
import { FinalRoom } from '@/components/FinalRoom';
import { MainMenu } from '@/components/MainMenu';
import { MemoryDrawer } from '@/components/MemoryDrawer';
import { MemoryReveal } from '@/components/MemoryReveal';
import { RoomCompleteReveal } from '@/components/RoomCompleteReveal';
import { RoomHub } from '@/components/RoomHub';
import { RoomScreen } from '@/components/RoomScreen';
import { SecretGallery } from '@/components/SecretGallery';
import { gameConfig, getRoom } from '@/data/gameConfig';
import { useGameProgress } from '@/hooks/useGameProgress';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { haptic } from '@/lib/haptics';
import { PuzzleRenderer } from '@/puzzles/PuzzleRenderer';
import { PuzzleShell } from '@/puzzles/PuzzleShell';
import type { RoomId } from '@/types/game';

type Screen = 'menu' | 'hub' | 'room' | 'ending';

export default function Home() {
  const auth = useGoogleAuth();
  const game = useGameProgress(auth.user);
  const [screen, setScreen] = useState<Screen>('menu');
  const [activePuzzle, setActivePuzzle] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [reveal, setReveal] = useState<number | null>(null);
  const [pendingRoomComplete, setPendingRoomComplete] = useState<RoomId | null>(null);
  const [roomComplete, setRoomComplete] = useState<RoomId | null>(null);
  const [secretReveal, setSecretReveal] = useState<RoomId | null>(null);
  const [memoriesOpen, setMemoriesOpen] = useState(false);
  const [secretGalleryOpen, setSecretGalleryOpen] = useState(false);
  const [prologue, setPrologue] = useState(false);

  if (!auth.ready) return <main className="game-shell loading-screen"><span className="loading-heart">♡</span></main>;
  if (!auth.user) return <AuthScreen busy={auth.busy} error={auth.error} configured={auth.configured} onSignIn={auth.signIn} />;
  if (!game.ready) return <main className="game-shell loading-screen"><span className="loading-heart">♡</span></main>;

  const room = getRoom(game.progress.currentRoomId);
  const roomProgress = game.progress.rooms[room.id];
  const activeConfig = activePuzzle === null ? null : room.puzzles[activePuzzle];

  const enterRoom = (roomId: RoomId, showIntro = false) => {
    game.setCurrentRoom(roomId);
    setScreen('room');
    setPrologue(showIntro);
  };
  const begin = () => { game.start(); enterRoom('beginning', true); };
  const openPuzzle = (index: number) => {
    setAttempts(0);
    if (roomProgress.puzzles[index]) setReveal(index);
    else setActivePuzzle(index);
  };
  const solve = (index: number) => {
    const completesRoom = !roomProgress.puzzles[index] && roomProgress.puzzles.filter(Boolean).length === room.puzzles.length - 1;
    game.completePuzzle(room.id, index);
    haptic([25, 35, 45]);
    setActivePuzzle(null);
    if (completesRoom) setPendingRoomComplete(room.id);
    setTimeout(() => setReveal(index), 180);
  };
  const closeMemoryReveal = () => {
    setReveal(null);
    if (pendingRoomComplete) { setRoomComplete(pendingRoomComplete); setPendingRoomComplete(null); }
  };
  const findRoomSecret = () => {
    if (!game.progress.secrets.includes(room.secret.id)) {
      game.findSecret(room.secret.id); haptic([18, 30, 18]); setSecretReveal(room.id);
    }
  };
  const resetGame = async () => { await game.reset(); setScreen('menu'); };

  return <>
    {screen === 'menu' && <MainMenu canContinue={game.progress.started} userName={auth.user.displayName ?? auth.user.email ?? 'Jugador'} userPhoto={auth.user.photoURL} onStart={begin} onContinue={() => setScreen('hub')} onReset={resetGame} onSignOut={auth.signOut} />}
    {screen === 'hub' && <RoomHub progress={game.progress} onRoom={(roomId) => enterRoom(roomId, !game.progress.rooms[roomId].puzzles.some(Boolean))} onMemories={() => setMemoriesOpen(true)} onFinal={() => setScreen('ending')} onMenu={() => setScreen('menu')} />}
    {screen === 'room' && <RoomScreen room={room} progress={roomProgress} secretFound={game.progress.secrets.includes(room.secret.id)} onPuzzle={openPuzzle} onSecret={findRoomSecret} onMemories={() => setMemoriesOpen(true)} onChest={() => roomProgress.completed && setRoomComplete(room.id)} onHub={() => setScreen('hub')} />}
    {screen === 'ending' && <FinalRoom allSecrets={game.progress.secrets.length === gameConfig.rooms.length} onMemories={() => setMemoriesOpen(true)} onSecretGallery={() => setSecretGalleryOpen(true)} onHub={() => setScreen('hub')} />}

    {prologue && <div className="overlay prologue-overlay" role="dialog" aria-modal="true" aria-labelledby="prologue-title"><section className="prologue-card"><span className="prologue-icon">{room.objects[0].icon}</span><p className="panel-kicker">{room.title}</p><h2 id="prologue-title">{gameConfig.couple.playerName}, abre esta parte de nuestra historia.</h2><p>{room.intro}</p><button className="primary-button" onClick={() => setPrologue(false)}>Entrar en la habitación</button></section></div>}

    {activePuzzle !== null && activeConfig && <PuzzleShell key={activeConfig.id} title={activeConfig.title} hint={activeConfig.hint} hints={activeConfig.hints} attempts={attempts} onClose={() => setActivePuzzle(null)}><PuzzleRenderer config={activeConfig} roomId={room.id} puzzleIndex={activePuzzle} completedCount={roomProgress.puzzles.slice(0, 4).filter(Boolean).length} onSolve={() => solve(activePuzzle)} onWrong={() => setAttempts((value) => value + 1)} /></PuzzleShell>}
    {reveal !== null && <MemoryReveal room={room} index={reveal} onClose={closeMemoryReveal} />}
    {roomComplete && <RoomCompleteReveal room={getRoom(roomComplete)} onContinue={() => { setRoomComplete(null); setScreen('hub'); }} />}
    {secretReveal && <div className="overlay reveal-overlay" role="dialog" aria-modal="true" aria-labelledby="secret-title"><section className="secret-reveal"><span>{getRoom(secretReveal).secret.symbol}</span><p className="panel-kicker">Secreto encontrado · {game.progress.secrets.length}/5</p><h2 id="secret-title">{getRoom(secretReveal).secret.label}</h2><p>{getRoom(secretReveal).secret.message}</p><button className="primary-button" onClick={() => setSecretReveal(null)}>Guardarlo</button></section></div>}
    {memoriesOpen && <MemoryDrawer progress={game.progress} initialRoomId={room.id} onClose={() => setMemoriesOpen(false)} />}
    {secretGalleryOpen && <SecretGallery onClose={() => setSecretGalleryOpen(false)} />}
  </>;
}
