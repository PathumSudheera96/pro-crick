import * as migration_20260811_164430_initial_users from './20260811_164430_initial_users';
import * as migration_20260812_065742_add_user_roles from './20260812_065742_add_user_roles';

export const migrations = [
  {
    up: migration_20260811_164430_initial_users.up,
    down: migration_20260811_164430_initial_users.down,
    name: '20260811_164430_initial_users',
  },
  {
    up: migration_20260812_065742_add_user_roles.up,
    down: migration_20260812_065742_add_user_roles.down,
    name: '20260812_065742_add_user_roles'
  },
];
