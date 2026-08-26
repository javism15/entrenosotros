import type { Memory, RoomConfig, RoomId } from '@/types/game';

const placeholderMemories = (room: RoomId, prefix: string, description: string): Memory[] =>
  Array.from({ length: 5 }, (_, index) => ({
    id: `${room}-${index + 1}`,
    title: `${prefix} ${index + 1}`,
    description,
    imageAlt: `Fotografía pendiente para ${prefix.toLowerCase()} ${index + 1}`,
  }));

const phoneApps = [
  { id: 'messages', label: 'Mensajes', icon: '●' },
  { id: 'photos', label: 'Fotos', icon: '▧' },
  { id: 'music', label: 'Música', icon: '♫' },
  { id: 'maps', label: 'Mapas', icon: '⌖' },
  { id: 'notes', label: 'Notas', icon: '≡' },
] as const;

export const gameConfig = {
  title: 'Entre Nosotros',
  couple: {
    playerName: 'Carla',
    partnerName: 'Tu nombre', // TODO: PERSONALIZAR
  },
  menu: {
    eyebrow: 'Cinco habitaciones · Una historia',
    subtitle: 'Los recuerdos no desaparecen.\nA veces, solo esperan ser encontrados.',
  },
  rooms: [
    {
      id: 'beginning', title: 'El comienzo', subtitle: 'Donde nuestra historia aprendió a latir', theme: 'beginning',
      intro: 'Esta habitación guarda los primeros fragmentos de nuestra historia. Encuéntralos. Recuérdanos.',
      reward: { letter: 'C', message: 'La primera pieza siempre estuvo al principio.' },
      objects: [
        { label: 'Caja', icon: '▣', position: 'one' }, { label: 'Radio', icon: '♫', position: 'two' },
        { label: 'Mapa', icon: '⌖', position: 'three' }, { label: 'Fotografía', icon: '▧', position: 'four' },
        { label: 'Reloj', icon: '◷', position: 'five' },
      ],
      puzzles: [
        { id: 'beginning-date', type: 'code', title: 'La primera llave', hint: 'Hay fechas que abren más que calendarios.', answer: '1402', label: 'Introduce una fecha de cuatro cifras', hints: ['Piensa en un día importante.', 'El formato es día y mes.', 'La respuesta de prueba es 1402.'] }, // TODO: PERSONALIZAR
        { id: 'beginning-song', type: 'choice', title: 'Nuestra frecuencia', hint: 'Solo una canción recuerda cómo empezó todo.', options: ['Nuestra canción', 'La canción del primer viaje', 'Aquella que bailamos'], answer: 'Nuestra canción', symbol: '♪', hints: ['No es la más reciente.', 'Es la que sentís como vuestra.'] }, // TODO: PERSONALIZAR
        { id: 'beginning-place', type: 'choice', title: 'Coordenadas del corazón', hint: 'Hay lugares a los que siempre sabemos volver.', options: ['El café de la esquina', 'Nuestro primer viaje', 'El parque bajo la lluvia'], answer: 'Nuestro primer viaje', symbol: '⌖', hints: ['Busca el lugar que cambió algo.', 'La respuesta de prueba menciona un viaje.'] }, // TODO: PERSONALIZAR
        { id: 'beginning-photo', type: 'photo', title: 'Imagen fragmentada', hint: 'A veces hay que recomponer el pasado.', image: '/og.png', imageAlt: 'Imagen provisional de Entre Nosotros', hints: ['Solo se mueven piezas junto al hueco.', 'Completa las filas de izquierda a derecha.'] },
        { id: 'beginning-final', type: 'code', title: 'La última combinación', hint: 'Las respuestas anteriores guardan la clave.', answer: '1404', label: 'Introduce el código final', hints: ['Combina la fecha y los cuatro fragmentos previos.', 'La respuesta de prueba es 1404.'] }, // TODO: PERSONALIZAR
      ],
      memories: [
        { id: 'beginning-1', title: 'El comienzo', description: 'El instante en que todo empezó a sentirse diferente.', imageAlt: 'Fotografía del comienzo de la relación' },
        { id: 'beginning-2', title: 'Nuestra canción', description: 'La melodía que convirtió un momento en nuestro.', imageAlt: 'Fotografía relacionada con nuestra canción' },
        { id: 'beginning-3', title: 'Aquel lugar', description: 'Un rincón del mundo que siempre será un poco nuestro.', imageAlt: 'Fotografía de un lugar importante' },
        { id: 'beginning-4', title: 'Una tarde cualquiera', description: 'Porque los días sencillos también se vuelven inolvidables.', imageAlt: 'Fotografía de una tarde juntos' },
        { id: 'beginning-5', title: 'Lo que viene', description: 'Un recuerdo del futuro, esperando a que lo vivamos.', imageAlt: 'Fotografía que representa el futuro' },
      ],
      secret: { id: 'beginning-secret', symbol: '♡', label: 'Un corazón oculto', message: 'Encontraste algo que siempre estuvo cerca.' }, // TODO: PERSONALIZAR
    },
    {
      id: 'adventures', title: 'Nuestras aventuras', subtitle: 'Cada lugar tiene una versión de nosotros', theme: 'travel',
      intro: 'Mapas, billetes y postales guardan las rutas que recorrimos juntos.',
      reward: { letter: 'A', message: 'Las mejores rutas siempre terminan encontrándonos.' },
      objects: [
        { label: 'Maleta', icon: '▤', position: 'one' }, { label: 'Billetes', icon: '▱', position: 'two' },
        { label: 'Brújula', icon: '✦', position: 'three' }, { label: 'Postal', icon: '▧', position: 'four' },
        { label: 'Pasaporte', icon: '▣', position: 'five' },
      ],
      puzzles: [
        { id: 'travel-order', type: 'choice', title: 'La primera ruta', hint: 'Todo viaje tiene un punto de partida.', options: ['Viaje A → Viaje B → Viaje C', 'Viaje B → Viaje C → Viaje A', 'Viaje C → Viaje A → Viaje B'], answer: 'Viaje A → Viaje B → Viaje C', symbol: '↗', hints: ['Ordena por fecha.', 'La opción provisional empieza por Viaje A.'] }, // TODO: PERSONALIZAR
        { id: 'travel-photo', type: 'photo', title: 'Postal fragmentada', hint: 'Un paisaje conocido espera detrás de las piezas.', image: '/og.png', imageAlt: 'Fotografía provisional de un viaje', hints: ['Empieza por las esquinas.', 'El hueco permite desplazar una pieza cada vez.'] },
        { id: 'travel-place', type: 'choice', title: 'Destino secreto', hint: 'La brújula recuerda el lugar correcto.', options: ['Destino pendiente', 'Nuestro lugar especial', 'Una ciudad cualquiera'], answer: 'Nuestro lugar especial', symbol: '⌖', hints: ['No es un lugar futuro.', 'Es el destino que ya sentís vuestro.'] }, // TODO: PERSONALIZAR
        { id: 'travel-discovery', type: 'discovery', title: 'Lo mejor del camino', hint: 'A veces el destino no es lo importante.', question: '¿Qué hizo especial aquel viaje para mí?', choices: ['El lugar', 'Compartirlo contigo', 'El itinerario'], correctChoice: 'Compartirlo contigo', revelation: 'El lugar fue precioso, pero mi recuerdo favorito fue vivirlo a tu lado.', hints: ['No aparece en una guía.', 'La respuesta viajó conmigo.'] }, // TODO: PERSONALIZAR
        { id: 'travel-code', type: 'code', title: 'Sello de entrada', hint: 'Una fecha convirtió el viaje en recuerdo.', answer: '0101', label: 'Introduce la fecha del viaje', hints: ['Usa día y mes.', 'La respuesta provisional es 0101.'] }, // TODO: PERSONALIZAR
      ],
      memories: placeholderMemories('adventures', 'Aventura', 'Recuerdo provisional de uno de nuestros viajes.'), // TODO: PERSONALIZAR
      secret: { id: 'adventures-secret', symbol: '✦', label: 'Una estrella de viaje', message: 'Hay destinos que solo existen cuando vamos juntos.' }, // TODO: PERSONALIZAR
    },
    {
      id: 'everyday', title: 'Nuestro día a día', subtitle: 'La magia de lo que parece pequeño', theme: 'home',
      intro: 'Esta casa recuerda cenas, pantallas, canciones y todas nuestras pequeñas costumbres.',
      reward: { letter: 'R', message: 'Hogar también es la persona con la que compartes lo cotidiano.' },
      objects: [
        { label: 'Sofá', icon: '▰', position: 'one' }, { label: 'Televisión', icon: '▣', position: 'two' },
        { label: 'Nevera', icon: '▤', position: 'three' }, { label: 'Móvil', icon: '▯', position: 'four' },
        { label: 'Altavoz', icon: '♫', position: 'five' },
      ],
      puzzles: [
        { id: 'home-dinner', type: 'choice', title: 'La pregunta de siempre', hint: 'Elegir qué cenar también es una tradición.', options: ['Pizza', 'Sushi', 'La respuesta pendiente'], answer: 'La respuesta pendiente', symbol: '⌂', hints: ['Piensa en vuestra broma habitual.', 'Personaliza esta respuesta en gameConfig.ts.'] }, // TODO: PERSONALIZAR
        { id: 'home-screen', type: 'choice', title: 'Una noche de sofá', hint: 'Hay historias que siempre veríamos otra vez.', options: ['Película favorita', 'Serie favorita', 'Programa pendiente'], answer: 'Serie favorita', symbol: '▶', hints: ['Es una serie.', 'La opción provisional es Serie favorita.'] }, // TODO: PERSONALIZAR
        { id: 'home-phone', type: 'phone', title: 'Un mensaje sin leer', hint: 'El teléfono guarda una conversación muy nuestra.', apps: phoneApps, targetApp: 'messages', conversation: ['Carla: ¿Qué quieres cenar?', 'Tú: Tengo una idea…'], question: '¿Cuál sería nuestra respuesta?', choices: ['Lo de siempre', 'Cualquier cosa', 'La respuesta pendiente'], correctChoice: 'La respuesta pendiente', hints: ['Abre Mensajes.', 'La opción correcta está pendiente de personalizar.'] }, // TODO: PERSONALIZAR
        { id: 'home-song', type: 'choice', title: 'Banda sonora doméstica', hint: 'También tenemos canciones para los días normales.', options: ['Canción A', 'Canción B', 'Canción C'], answer: 'Canción B', symbol: '♫', hints: ['No es la primera.', 'La respuesta provisional es Canción B.'] }, // TODO: PERSONALIZAR
        { id: 'home-joke', type: 'discovery', title: 'Nuestro idioma', hint: 'Hay frases que solo nosotros entendemos.', question: '¿Qué convierte una rutina en un recuerdo?', choices: ['La perfección', 'Reírnos juntos', 'Seguir un plan'], correctChoice: 'Reírnos juntos', revelation: 'Mis días favoritos no necesitan ser perfectos si puedo reírme contigo.', hints: ['No hace falta seguir un plan.', 'Tiene que ver con vuestra complicidad.'] }, // TODO: PERSONALIZAR
      ],
      memories: placeholderMemories('everyday', 'Pequeño momento', 'Recuerdo provisional de nuestro día a día.'), // TODO: PERSONALIZAR
      secret: { id: 'everyday-secret', symbol: '✿', label: 'Una flor escondida', message: 'Lo cotidiano también florece.' }, // TODO: PERSONALIZAR
    },
    {
      id: 'carla', title: 'Carla', subtitle: 'Todo lo que quizá no digo suficiente', theme: 'carla',
      intro: 'Esta habitación no te examina: guarda algunas cosas que quiero que descubras sobre cómo te veo.',
      reward: { letter: 'L', message: 'Esta pieza lleva tu luz.' },
      objects: [
        { label: 'Espejo', icon: '◇', position: 'one' }, { label: 'Carta', icon: '▱', position: 'two' },
        { label: 'Flores', icon: '✿', position: 'three' }, { label: 'Retrato', icon: '▧', position: 'four' },
        { label: 'Luz', icon: '✦', position: 'five' },
      ],
      puzzles: [
        { id: 'carla-love', type: 'discovery', title: 'Me encanta de ti…', hint: 'No hay una sola respuesta, pero esta es una de las mías.', question: '¿Qué detalle tuyo me hace sentir en casa?', choices: ['Tu forma de escuchar', 'Una respuesta pendiente', 'Tu manera de reír'], correctChoice: 'Una respuesta pendiente', revelation: 'Aquí irá algo concreto y sincero que me encanta de ti.', hints: ['Es algo muy tuyo.', 'Personaliza la revelación en gameConfig.ts.'] }, // TODO: PERSONALIZAR
        { id: 'carla-admire', type: 'discovery', title: 'Admiro de ti…', hint: 'Hay fortalezas que quizá tú no siempre ves.', question: '¿Qué cualidad tuya admiro especialmente?', choices: ['Cualidad A', 'Cualidad B', 'Cualidad C'], correctChoice: 'Cualidad B', revelation: 'Aquí explicaré por qué admiro esta parte de ti.', hints: ['No hace falta adivinar todavía.', 'La respuesta provisional es Cualidad B.'] }, // TODO: PERSONALIZAR
        { id: 'carla-moment', type: 'photo', title: 'Un momento favorito', hint: 'Una imagen puede guardar mucho más de lo que muestra.', image: '/og.png', imageAlt: 'Fotografía provisional de Carla', hints: ['Mueve solo piezas contiguas.', 'La imagen real irá en public/memories.'] },
        { id: 'carla-unsaid', type: 'discovery', title: 'Algo que no digo suficiente', hint: 'Esta respuesta no se recuerda: se descubre.', question: '¿Qué quiero recordarte más a menudo?', choices: ['Mensaje A', 'Mensaje B', 'Mensaje pendiente'], correctChoice: 'Mensaje pendiente', revelation: 'Aquí irá algo que quiero decirte mucho más a menudo.', hints: ['Es un mensaje personal.', 'Personalízalo en la configuración.'] }, // TODO: PERSONALIZAR
        { id: 'carla-letter', type: 'code', title: 'La carta cerrada', hint: 'Una clave sencilla protege una verdad importante.', answer: '0000', label: 'Introduce el código de la carta', hints: ['El código está pendiente.', 'La respuesta provisional es 0000.'] }, // TODO: PERSONALIZAR
      ],
      memories: placeholderMemories('carla', 'Lo que veo en ti', 'Mensaje provisional dedicado a Carla.'), // TODO: PERSONALIZAR
      secret: { id: 'carla-secret', symbol: 'C', label: 'Una inicial escondida', message: 'Esta habitación siempre supo tu nombre.' }, // TODO: PERSONALIZAR
    },
    {
      id: 'future', title: 'Nuestro futuro', subtitle: 'Una habitación que todavía estamos escribiendo', theme: 'future',
      intro: 'Al principio parece vacía. Cada respuesta encenderá una posibilidad que aún podemos vivir.',
      reward: { letter: 'A', message: 'La última pieza no cierra nada: abre todo lo que viene.' },
      objects: [
        { label: 'Estrella', icon: '✦', position: 'one' }, { label: 'Billete', icon: '▱', position: 'two' },
        { label: 'Llave', icon: '⌑', position: 'three' }, { label: 'Álbum', icon: '▧', position: 'four' },
        { label: 'Horizonte', icon: '◌', position: 'five' },
      ],
      puzzles: [
        { id: 'future-destination', type: 'choice', title: 'Próxima coordenada', hint: 'Hay lugares que todavía solo existen en nuestros planes.', options: ['Destino futuro A', 'Destino futuro B', 'Destino futuro C'], answer: 'Destino futuro B', symbol: '⌖', hints: ['Es un viaje pendiente.', 'La respuesta provisional es Destino futuro B.'] }, // TODO: PERSONALIZAR
        { id: 'future-plan', type: 'discovery', title: 'Un plan pequeño', hint: 'El futuro también se construye con tardes sencillas.', question: '¿Qué plan quiero repetir contigo muchas veces?', choices: ['Plan A', 'Plan pendiente', 'Plan C'], correctChoice: 'Plan pendiente', revelation: 'Aquí irá uno de esos planes sencillos que quiero seguir compartiendo contigo.', hints: ['No tiene que ser un gran viaje.', 'Personaliza este plan.'] }, // TODO: PERSONALIZAR
        { id: 'future-dream', type: 'choice', title: 'Una ventana abierta', hint: 'Algunos sueños necesitan dos personas.', options: ['Sueño A', 'Sueño B', 'Sueño pendiente'], answer: 'Sueño pendiente', symbol: '✦', hints: ['Es algo que imagináis juntos.', 'La respuesta está pendiente.'] }, // TODO: PERSONALIZAR
        { id: 'future-photo', type: 'photo', title: 'La foto que falta', hint: 'Esta imagen aún no existe, pero ya tiene un lugar.', image: '/og.png', imageAlt: 'Imagen provisional del futuro', hints: ['Construye una imagen que todavía no habéis tomado.', 'La imagen real puede reemplazarse desde configuración.'] },
        { id: 'future-code', type: 'code', title: 'Fecha por escribir', hint: 'El futuro también puede empezar con una fecha elegida.', answer: '2027', label: 'Introduce el año de un plan futuro', hints: ['Es un año de cuatro cifras.', 'La respuesta provisional es 2027.'] }, // TODO: PERSONALIZAR
      ],
      memories: placeholderMemories('future', 'Recuerdo por crear', 'Un espacio reservado para algo que todavía viviremos juntos.'), // TODO: PERSONALIZAR
      secret: { id: 'future-secret', symbol: '◌', label: 'Una posibilidad oculta', message: 'Encontraste un recuerdo que todavía no existe.' }, // TODO: PERSONALIZAR
      completionMessages: ['Los recuerdos anteriores ya están escritos.', 'Esta habitación todavía está vacía porque nos queda llenarla juntos.'],
    },
  ] satisfies readonly RoomConfig[],
  secretGallery: {
    title: 'Galería secreta',
    intro: 'Cinco pequeños secretos han abierto un rincón solo nuestro.',
    items: [
      { title: 'Sorpresa 1', description: 'Contenido secreto pendiente.', imageAlt: 'Sorpresa secreta 1' },
      { title: 'Sorpresa 2', description: 'Contenido secreto pendiente.', imageAlt: 'Sorpresa secreta 2' },
      { title: 'Sorpresa 3', description: 'Contenido secreto pendiente.', imageAlt: 'Sorpresa secreta 3' },
    ], // TODO: PERSONALIZAR
  },
  final: {
    backgroundImage: undefined as string | undefined, // TODO: PERSONALIZAR con /memories/final.webp
    messages: [
      'Carla, has conseguido recuperar todos nuestros recuerdos.',
      'Pero había una trampa.',
      'Este juego nunca trató realmente de recordar el pasado.',
      'Trataba de recordarte que mi parte favorita de todos esos recuerdos eres tú.',
    ],
    finalMessage: 'Te elegiría en esta vida, en todas las anteriores y en cada recuerdo que aún nos queda por crear. Te quiero.', // TODO: PERSONALIZAR
    audio: undefined as string | undefined, // TODO: PERSONALIZAR con /audio/mensaje-final.m4a
  },
} as const;

export const roomOrder = gameConfig.rooms.map((room) => room.id) as RoomId[];
export function getRoom(roomId: RoomId): RoomConfig {
  return gameConfig.rooms.find((room) => room.id === roomId) ?? gameConfig.rooms[0];
}
