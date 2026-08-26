export function SecretCollectible({ symbol, label, found, onFind }: { symbol: string; label: string; found: boolean; onFind: () => void }) {
  return <button type="button" className={`secret-collectible ${found ? 'secret-found' : ''}`} aria-label={found ? `${label}, encontrado` : label} onClick={onFind}>{found ? '✓' : symbol}</button>;
}
