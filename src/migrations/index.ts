import * as migration_20260811_164430_initial_users from './20260811_164430_initial_users';
import * as migration_20260812_065742_add_user_roles from './20260812_065742_add_user_roles';
import * as migration_20260812_155313_media from './20260812_155313_media';
import * as migration_20260812_163426_player_taxonomies from './20260812_163426_player_taxonomies';

export const migrations = [
  {
    up: migration_20260811_164430_initial_users.up,
    down: migration_20260811_164430_initial_users.down,
    name: '20260811_164430_initial_users',
  },
  {
    up: migration_20260812_065742_add_user_roles.up,
    down: migration_20260812_065742_add_user_roles.down,
    name: '20260812_065742_add_user_roles',
  },
  {
    up: migration_20260812_155313_media.up,
    down: migration_20260812_155313_media.down,
    name: '20260812_155313_media',
  },
  {
    up: migration_20260812_163426_player_taxonomies.up,
    down: migration_20260812_163426_player_taxonomies.down,
    name: '20260812_163426_player_taxonomies'
  },
];
