import { gameConfig } from '@/data/gameConfig';

export function MainMenu({ canContinue, userName, userPhoto, onStart, onContinue, onSignOut }: { canContinue: boolean; userName: string; userPhoto?: string | null; onStart: () => void; onContinue: () => void; onSignOut: () => void }) {
  return (
    <main className="game-shell menu-screen">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="account-pill">
        {userPhoto ? <img src={userPhoto} alt="" referrerPolicy="no-referrer" /> : <span>{userName.charAt(0).toUpperCase()}</span>}
        <div><small>Partida sincronizada</small><strong>{userName}</strong></div>
        <button onClick={onSignOut}>Salir</button>
      </div>
      <section className="menu-card" aria-labelledby="game-title">
        <div className="sigil" aria-hidden="true">♡</div>
        <p className="eyebrow">Una habitación · Cinco recuerdos</p>
        <h1 id="game-title">{gameConfig.title}</h1>
        <p className="subtitle">Los recuerdos no desaparecen.<br />A veces, solo esperan ser encontrados.</p>
        <div className="menu-actions">
          <button type="button" className="primary-button" onClick={onStart}>Comenzar</button>
          {canContinue && <button type="button" className="secondary-button" onClick={onContinue}>Continuar partida</button>}
        </div>
        <div className="fragment-preview" aria-label="Cinco recuerdos por recuperar">{[0,1,2,3,4].map((item) => <span key={item} />)}</div>
      </section>
      <p className="sound-note">Auriculares recomendados</p>
    </main>
  );
}

