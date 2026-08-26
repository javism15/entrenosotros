'use client';

import { useState } from 'react';
import Image from 'next/image';
import { gameConfig } from '@/data/gameConfig';

export function MainMenu({ canContinue, userName, userPhoto, onStart, onContinue, onReset, onSignOut }: { canContinue: boolean; userName: string; userPhoto?: string | null; onStart: () => void; onContinue: () => void; onReset: () => Promise<void>; onSignOut: () => void }) {
  const [confirmReset, setConfirmReset] = useState(false);
  return (
    <main className="game-shell menu-screen">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="account-pill">{userPhoto ? <Image src={userPhoto} alt="" width={36} height={36} unoptimized referrerPolicy="no-referrer" /> : <span>{userName.charAt(0).toUpperCase()}</span>}<div><small>Partida sincronizada</small><strong>{userName}</strong></div><button onClick={onSignOut}>Salir</button></div>
      <section className="menu-card" aria-labelledby="game-title"><div className="sigil" aria-hidden="true">♡</div><p className="eyebrow">{gameConfig.menu.eyebrow}</p><h1 id="game-title">{gameConfig.title}</h1><p className="subtitle">{gameConfig.menu.subtitle.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</p><div className="menu-actions"><button type="button" className="primary-button" onClick={onStart}>{canContinue ? 'Volver al comienzo' : 'Comenzar'}</button>{canContinue && <button type="button" className="secondary-button" onClick={onContinue}>Continuar partida</button>}</div><div className="fragment-preview" aria-label="Cinco habitaciones por descubrir">{gameConfig.rooms.map((room) => <span key={room.id} />)}</div>{canContinue && <button type="button" className="reset-link" onClick={() => setConfirmReset(true)}>Reiniciar partida</button>}</section><p className="sound-note">Auriculares recomendados</p>
      {confirmReset && <div className="overlay reset-overlay" role="dialog" aria-modal="true" aria-labelledby="reset-title"><section className="confirm-card"><p className="panel-kicker">Empezar de nuevo</p><h2 id="reset-title">¿Reiniciar toda la partida?</h2><p>Se borrarán los puzles, recuerdos y secretos guardados. Tu sesión de Google seguirá abierta.</p><button className="primary-button" onClick={() => { void onReset().then(() => setConfirmReset(false)); }}>Sí, reiniciar</button><button className="secondary-button" onClick={() => setConfirmReset(false)}>Cancelar</button></section></div>}
    </main>
  );
}
