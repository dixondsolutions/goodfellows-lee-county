import * as migration_20260224_004820 from './20260224_004820';

export const migrations = [
  {
    up: migration_20260224_004820.up,
    down: migration_20260224_004820.down,
    name: '20260224_004820'
  },
];
