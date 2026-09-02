import * as migration_20260811_164430_initial_users from './20260811_164430_initial_users';
import * as migration_20260823_000001_add_user_roles from './20260823_000001_add_user_roles';
import * as migration_20260823_152954 from './20260823_152954';
import * as migration_20260823_175458 from './20260823_175458';
import * as migration_20260823_175557 from './20260823_175557';
import * as migration_20260823_175649 from './20260823_175649';
import * as migration_20260824_021515 from './20260824_021515';
import * as migration_20260824_021626 from './20260824_021626';
import * as migration_20260824_022152 from './20260824_022152';
import * as migration_20260824_022439 from './20260824_022439';
import * as migration_20260824_042449 from './20260824_042449';
import * as migration_20260824_042759 from './20260824_042759';
import * as migration_20260824_043547 from './20260824_043547';
import * as migration_20260902_142000_add_turnstile_to_site_settings from './20260902_142000_add_turnstile_to_site_settings';
import * as migration_20260902_075050_add_news_collection from './20260902_075050_add_news_collection';
import * as migration_20260902_125500_add_player_category from './20260902_125500_add_player_category';

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
    name: '20260824_021515',
  },
  {
    up: migration_20260824_021626.up,
    down: migration_20260824_021626.down,
    name: '20260824_021626',
  },
  {
    up: migration_20260824_022152.up,
    down: migration_20260824_022152.down,
    name: '20260824_022152',
  },
  {
    up: migration_20260824_022439.up,
    down: migration_20260824_022439.down,
    name: '20260824_022439',
  },
  {
    up: migration_20260824_042449.up,
    down: migration_20260824_042449.down,
    name: '20260824_042449',
  },
  {
    up: migration_20260824_042759.up,
    down: migration_20260824_042759.down,
    name: '20260824_042759',
  },
  {
    up: migration_20260824_043547.up,
    down: migration_20260824_043547.down,
    name: '20260824_043547',
  },
  {
    up: migration_20260902_075050_add_news_collection.up,
    down: migration_20260902_075050_add_news_collection.down,
    name: '20260902_075050_add_news_collection'
  },
  {
    up: migration_20260902_125500_add_player_category.up,
    down: migration_20260902_125500_add_player_category.down,
    name: '20260902_125500_add_player_category'
  },
  {
    up: migration_20260902_142000_add_turnstile_to_site_settings.up,
    down: migration_20260902_142000_add_turnstile_to_site_settings.down,
    name: '20260902_142000_add_turnstile_to_site_settings',
  },
];
