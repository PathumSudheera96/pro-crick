import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_players_player_category" AS ENUM('professional-player', 'amateur-player', 'local-player');
  ALTER TABLE "players" ADD COLUMN "player_category" "enum_players_player_category";
  UPDATE "players" SET "player_category" = 'professional-player' WHERE "player_category" IS NULL;
  ALTER TABLE "players" ALTER COLUMN "player_category" SET DEFAULT 'professional-player';
  ALTER TABLE "players" ALTER COLUMN "player_category" SET NOT NULL;
  CREATE INDEX "players_player_category_idx" ON "players" USING btree ("player_category");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "players_player_category_idx";
  ALTER TABLE "players" DROP COLUMN "player_category";
  DROP TYPE "public"."enum_players_player_category";`)
}
