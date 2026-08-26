export type RoomId = 'beginning' | 'adventures' | 'everyday' | 'carla' | 'future';
export type RoomTheme = 'beginning' | 'travel' | 'home' | 'carla' | 'future';

export type Memory = {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt: string;
  optionalDate?: string;
  optionalLocation?: string;
  optionalExtraText?: string;
  audio?: string;
};

type PuzzleBase = {
  id: string;
  title: string;
  hint: string;
  hints?: readonly string[];
};

export type CodePuzzleConfig = PuzzleBase & { type: 'code'; answer: string; label: string };
export type ChoicePuzzleConfig = PuzzleBase & { type: 'choice'; options: readonly string[]; answer: string; symbol: string };
export type PhotoPuzzleConfig = PuzzleBase & { type: 'photo'; image?: string; imageAlt: string };
export type DiscoveryPuzzleConfig = PuzzleBase & { type: 'discovery'; question: string; choices: readonly string[]; correctChoice: string; revelation: string };

export type PhoneApp = { id: 'messages' | 'photos' | 'music' | 'maps' | 'notes'; label: string; icon: string };
export type PhonePuzzleConfig = PuzzleBase & { type: 'phone'; apps: readonly PhoneApp[]; targetApp: PhoneApp['id']; conversation: readonly string[]; question: string; choices: readonly string[]; correctChoice: string };
export type PuzzleConfig = CodePuzzleConfig | ChoicePuzzleConfig | PhotoPuzzleConfig | DiscoveryPuzzleConfig | PhonePuzzleConfig;

export type RoomObject = { label: string; icon: string; position: 'one' | 'two' | 'three' | 'four' | 'five' };
export type RoomConfig = {
  id: RoomId;
  title: string;
  subtitle: string;
  theme: RoomTheme;
  intro: string;
  reward: { letter: 'C' | 'A' | 'R' | 'L'; message: string };
  objects: readonly RoomObject[];
  puzzles: readonly PuzzleConfig[];
  memories: readonly Memory[];
  secret: { id: string; symbol: string; label: string; message: string };
  completionMessages?: readonly string[];
};

export type RoomProgress = { unlocked: boolean; completed: boolean; puzzles: boolean[] };
export type LegacyProgress = { started: boolean; completed: boolean[] };
export type GameProgress = {
  version: 2;
  started: boolean;
  currentRoomId: RoomId;
  rooms: Record<RoomId, RoomProgress>;
  secrets: string[];
  legacy?: LegacyProgress;
};
