import * as migration_20260811_164430_initial_users from './20260811_164430_initial_users';
import * as migration_20260823_000001_add_user_roles from './20260823_000001_add_user_roles';
import * as migration_20260823_152954 from './20260823_152954';
import * as migration_20260823_175458 from './20260823_175458';
import * as migration_20260823_175557 from './20260823_175557';
import * as migration_20260823_175649 from './20260823_175649';
import * as migration_20260824_021515 from './20260824_021515';

export const migrations = [
  {
    up: migration_20260811_164430_initial_users.up,
    down: migration_20260811_164430_initial_users.down,
    name: '20260811_164430_initial_users',
  },
  {
    up: migration_20260823_000001_add_user_roles.up,
    down: migration_20260823_000001_add_user_roles.down,
    name: '20260823_000001_add_user_roles',
  },
  {
    up: migration_20260823_152954.up,
    down: migration_20260823_152954.down,
    name: '20260823_152954',
  },
  {
    up: migration_20260823_175458.up,
    down: migration_20260823_175458.down,
    name: '20260823_175458',
  },
  {
    up: migration_20260823_175557.up,
    down: migration_20260823_175557.down,
    name: '20260823_175557',
  },
  {
    up: migration_20260823_175649.up,
    down: migration_20260823_175649.down,
    name: '20260823_175649',
  },
  {
    up: migration_20260824_021515.up,
    down: migration_20260824_021515.down,
    name: '20260824_021515'
  },
];
