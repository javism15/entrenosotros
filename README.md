# Entre Nosotros

Escape room romántico multi-habitación para móvil creado con Next.js, React, TypeScript y Tailwind CSS. Incluye cinco capítulos, 25 puzles configurables, recuerdos, secretos, acceso directo con Google y sincronización del progreso con Cloud Firestore.

## Demo

[Jugar a Entre Nosotros](https://entre-nosotros-escape-room.chatpilila.chatgpt.site)

## Documentación

Consulta [DOCUMENTACION.md](DOCUMENTACION.md) para ver la explicación completa del juego, su arquitectura, estructura, persistencia, PWA y despliegue.

## Desarrollo

```bash
pnpm install
Copy-Item .env.example .env.local # completa la configuración pública de Firebase
pnpm dev
```

## Personalización

Todo el contenido personal de Carla —nombres, fechas, viajes, canciones, conversaciones, respuestas, recuerdos, audios, secretos y final— se edita desde `data/gameConfig.ts`. Las fotografías se guardan en `public/memories/` y los audios en `public/audio/`.

## Comprobaciones

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```
