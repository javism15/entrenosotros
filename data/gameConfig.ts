export type Memory = {
  title: string;
  description: string;
  image: string;
};

export const gameConfig = {
  title: 'Entre Nosotros',
  playerName: 'Mi amor',
  partnerName: 'Tu nombre',
  importantDate: '1402',
  songs: ['Nuestra canción', 'La canción del primer viaje', 'Aquella que bailamos'],
  correctSong: 'Nuestra canción',
  locations: ['El café de la esquina', 'Nuestro primer viaje', 'El parque bajo la lluvia'],
  correctLocation: 'Nuestro primer viaje',
  finalCode: '1404',
  finalMessage: 'Te elegiría en esta vida, en todas las anteriores y en cada recuerdo que aún nos queda por crear. Te quiero.',
  memories: [
    { title: 'El comienzo', description: 'El instante en que todo empezó a sentirse diferente.', image: '01' },
    { title: 'Nuestra canción', description: 'La melodía que convirtió un momento en nuestro.', image: '02' },
    { title: 'Aquel lugar', description: 'Un rincón del mundo que siempre será un poco nuestro.', image: '03' },
    { title: 'Una tarde cualquiera', description: 'Porque los días sencillos también se vuelven inolvidables.', image: '04' },
    { title: 'Lo que viene', description: 'Un recuerdo del futuro, esperando a que lo vivamos.', image: '05' },
  ] satisfies Memory[],
} as const;

export const puzzleDetails = [
  { object: 'Caja', title: 'La primera llave', hint: 'Hay fechas que abren más que calendarios.' },
  { object: 'Radio', title: 'Nuestra frecuencia', hint: 'Solo una canción recuerda cómo empezó todo.' },
  { object: 'Mapa', title: 'Coordenadas del corazón', hint: 'Hay lugares a los que siempre sabemos volver.' },
  { object: 'Fotografía', title: 'Imagen fragmentada', hint: 'A veces hay que recomponer el pasado.' },
  { object: 'Reloj', title: 'La última combinación', hint: 'Las respuestas anteriores guardan la clave.' },
] as const;
