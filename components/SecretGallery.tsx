import { gameConfig } from '@/data/gameConfig';

export function SecretGallery({ onClose }: { onClose: () => void }) {
  return <div className="overlay drawer-overlay" role="dialog" aria-modal="true" aria-labelledby="gallery-title"><section className="memory-drawer secret-gallery"><div className="drawer-handle" /><button className="close-button" onClick={onClose} aria-label="Cerrar">×</button><p className="panel-kicker">Los cinco secretos</p><h2 id="gallery-title">{gameConfig.secretGallery.title}</h2><p className="drawer-progress">{gameConfig.secretGallery.intro}</p><div className="secret-gallery-grid">{gameConfig.secretGallery.items.map((item, index) => <article key={item.title}><div><span>0{index + 1}</span></div><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section></div>;
}
