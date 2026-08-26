import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Entre Nosotros — Escape Room',
    short_name: 'Entre Nosotros',
    description: 'Cinco habitaciones románticas, veinticinco recuerdos y una historia por recuperar.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#080b11',
    theme_color: '#080b11',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
