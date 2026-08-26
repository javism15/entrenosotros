'use client';

import { useEffect, useRef, useState } from 'react';

export function AudioMessage({ src, label = 'Mensaje de audio' }: { src: string; label?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    const stop = () => setPlaying(false);
    audio.addEventListener('timeupdate', update);
    audio.addEventListener('ended', stop);
    return () => { audio.removeEventListener('timeupdate', update); audio.removeEventListener('ended', stop); };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { await audio.play(); setPlaying(true); }
    else { audio.pause(); setPlaying(false); }
  };

  return (
    <div className="audio-message">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button type="button" onClick={() => void toggle()} aria-label={playing ? `Pausar ${label}` : `Reproducir ${label}`}>{playing ? 'Ⅱ' : '▶'}</button>
      <div><strong>{label}</strong><span><i style={{ width: `${progress * 100}%` }} /></span></div>
    </div>
  );
}
