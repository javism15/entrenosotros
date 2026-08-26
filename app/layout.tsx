import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://entre-nosotros-escape-room.chatpilila.chatgpt.site'),
  title: 'Entre Nosotros — Escape Room',
  description: 'Cinco habitaciones románticas, veinticinco recuerdos y una historia por recuperar.',
  applicationName: 'Entre Nosotros',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Entre Nosotros' },
  formatDetection: { telephone: false },
  icons: { icon: [{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' }], apple: '/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    title: 'Entre Nosotros — Escape Room',
    description: 'Cinco habitaciones románticas, veinticinco recuerdos y una historia por recuperar.',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'Entre Nosotros' }],
  },
  twitter: { card: 'summary_large_image', title: 'Entre Nosotros — Escape Room', description: 'Cinco habitaciones románticas, veinticinco recuerdos y una historia por recuperar.', images: ['/og.png'] },
};

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, maximumScale: 1, userScalable: false,
  viewportFit: 'cover', themeColor: '#080b11',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
