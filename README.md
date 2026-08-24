# Entre Nosotros

Escape room romántico para móvil creado con Next.js, React, TypeScript y Tailwind CSS. Incluye acceso directo con Google mediante Firebase Authentication y sincronización del progreso con Cloud Firestore.

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

Los nombres, fechas, canciones, lugares, recuerdos, respuestas y el mensaje final se editan desde `data/gameConfig.ts`.

## Comprobaciones

```bash
pnpm exec tsc --noEmit
pnpm build
```

