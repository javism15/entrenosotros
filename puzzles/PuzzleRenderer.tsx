import { ChoicePuzzle } from '@/puzzles/ChoicePuzzle';
import { CodePuzzle } from '@/puzzles/CodePuzzle';
import { DiscoveryPuzzle } from '@/puzzles/DiscoveryPuzzle';
import { PhonePuzzle } from '@/puzzles/PhonePuzzle';
import { PhotoPuzzle } from '@/puzzles/PhotoPuzzle';
import type { PuzzleConfig, RoomId } from '@/types/game';

export function PuzzleRenderer({ config, roomId, puzzleIndex, completedCount, onSolve, onWrong }: { config: PuzzleConfig; roomId: RoomId; puzzleIndex: number; completedCount: number; onSolve: () => void; onWrong: () => void }) {
  if (config.type === 'code') return <>
    {roomId === 'beginning' && puzzleIndex === 4 && <div className="clue-strip"><span>Fecha</span><b>14</b><span>Fragmentos</span><b>0{completedCount}</b></div>}
    <CodePuzzle answer={config.answer} label={config.label} onSolve={onSolve} onWrong={onWrong} />
  </>;
  if (config.type === 'choice') return <ChoicePuzzle options={config.options} answer={config.answer} symbol={config.symbol} onSolve={onSolve} onWrong={onWrong} />;
  if (config.type === 'photo') return <PhotoPuzzle image={config.image} imageAlt={config.imageAlt} onSolve={onSolve} onWrong={onWrong} />;
  if (config.type === 'discovery') return <DiscoveryPuzzle question={config.question} choices={config.choices} correctChoice={config.correctChoice} revelation={config.revelation} onSolve={onSolve} onWrong={onWrong} />;
  return <PhonePuzzle config={config} onSolve={onSolve} onWrong={onWrong} />;
}
