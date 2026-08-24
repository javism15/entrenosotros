export function AuthScreen({ busy, error, configured, onSignIn }: { busy: boolean; error: string | null; configured: boolean; onSignIn: () => void }) {
  return (
    <main className="game-shell auth-screen">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="sigil" aria-hidden="true">♡</div>
        <p className="eyebrow">Una historia que viaja contigo</p>
        <h1 id="auth-title">Guarda tus recuerdos</h1>
        <p className="auth-copy">Entra con tu cuenta de Google para conservar la partida y continuar desde cualquier dispositivo.</p>
        {configured ? (
          <button className="google-button" onClick={onSignIn} disabled={busy}>
            <span className="google-mark" aria-hidden="true">G</span>
            {busy ? 'Conectando…' : 'Continuar con Google'}
          </button>
        ) : (
          <div className="auth-setup" role="status">La conexión con Google está pendiente de configuración.</div>
        )}
        {error && <p className="error-text" role="alert">{error}</p>}
        <p className="privacy-note">Solo guardaremos tu identidad de acceso y el progreso de los cinco puzles.</p>
      </section>
    </main>
  );
}

