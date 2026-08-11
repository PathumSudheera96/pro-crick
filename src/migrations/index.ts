import * as migration_20260811_164430_initial_users from './20260811_164430_initial_users';

export const migrations = [
  {
    up: migration_20260811_164430_initial_users.up,
    down: migration_20260811_164430_initial_users.down,
    name: '20260811_164430_initial_users'
  },
];
