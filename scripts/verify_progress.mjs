import assert from 'node:assert/strict';
import { createServer } from 'vite';

const projectRoot = process.cwd().replaceAll('\\', '/');
const server = await createServer({
  configFile: false,
  server: { middlewareMode: true },
  resolve: { alias: { '@': projectRoot } },
});

try {
  const { createInitialProgress, migrateProgress, mergeProgress } = await server.ssrLoadModule('/hooks/useGameProgress.ts');
  const partialLegacy = { started: true, completed: [true, true, false, false, false] };
  const migrated = migrateProgress(partialLegacy);
  assert.equal(migrated.version, 2);
  assert.deepEqual(migrated.rooms.beginning.puzzles, partialLegacy.completed);
  assert.equal(migrated.rooms.beginning.completed, false);
  assert.equal(migrated.rooms.adventures.unlocked, false);
  assert.deepEqual(migrated.legacy, partialLegacy);

  const completeLegacy = migrateProgress({ started: true, completed: [true, true, true, true, true] });
  assert.equal(completeLegacy.rooms.beginning.completed, true);
  assert.equal(completeLegacy.rooms.adventures.unlocked, true);

  const local = createInitialProgress();
  local.started = true;
  local.rooms.beginning.puzzles[0] = true;
  local.secrets.push('beginning-secret');
  const cloud = createInitialProgress();
  cloud.started = true;
  cloud.rooms.beginning.puzzles[1] = true;
  cloud.secrets.push('adventures-secret');
  const merged = mergeProgress(local, cloud);
  assert.deepEqual(merged.rooms.beginning.puzzles.slice(0, 2), [true, true]);
  assert.deepEqual(merged.secrets.sort(), ['adventures-secret', 'beginning-secret']);

  console.log('Progress migration and merge checks passed.');
} finally {
  await server.close();
}
