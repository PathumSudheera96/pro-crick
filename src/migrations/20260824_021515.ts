import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_players_gender" AS ENUM('male', 'female', 'other');
  CREATE TYPE "public"."enum_players_batting_style" AS ENUM('right-hand-bat', 'left-hand-bat');
  CREATE TYPE "public"."enum_players_bowling_style" AS ENUM('right-arm-fast', 'right-arm-medium', 'right-arm-off-break', 'right-arm-leg-break', 'left-arm-fast', 'left-arm-medium', 'left-arm-orthodox', 'left-arm-wrist-spin');
  CREATE TYPE "public"."enum_players_player_status" AS ENUM('available', 'contracted', 'unavailable');
  CREATE TYPE "public"."enum_players_status" AS ENUM('draft', 'published', 'archived');
  CREATE TABLE "players" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"profile_image_id" integer,
  	"hero_image_id" integer,
  	"short_introduction" varchar,
  	"date_of_birth" timestamp(3) with time zone,
  	"nationality_id" integer NOT NULL,
  	"gender" "enum_players_gender",
  	"current_location" varchar,
  	"primary_role_id" integer NOT NULL,
  	"batting_style" "enum_players_batting_style",
  	"bowling_style" "enum_players_bowling_style",
  	"current_club_id" integer,
  	"player_status" "enum_players_player_status" DEFAULT 'available' NOT NULL,
  	"availability_date" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0 NOT NULL,
  	"status" "enum_players_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "players_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"clubs_id" integer,
  	"countries_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "players_id" integer;
  ALTER TABLE "players" ADD CONSTRAINT "players_profile_image_id_media_id_fk" FOREIGN KEY ("profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "players" ADD CONSTRAINT "players_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "players" ADD CONSTRAINT "players_nationality_id_countries_id_fk" FOREIGN KEY ("nationality_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "players" ADD CONSTRAINT "players_primary_role_id_playing_roles_id_fk" FOREIGN KEY ("primary_role_id") REFERENCES "public"."playing_roles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "players" ADD CONSTRAINT "players_current_club_id_clubs_id_fk" FOREIGN KEY ("current_club_id") REFERENCES "public"."clubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "players_rels" ADD CONSTRAINT "players_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "players_rels" ADD CONSTRAINT "players_rels_clubs_fk" FOREIGN KEY ("clubs_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "players_rels" ADD CONSTRAINT "players_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "players_full_name_idx" ON "players" USING btree ("full_name");
  CREATE UNIQUE INDEX "players_slug_idx" ON "players" USING btree ("slug");
  CREATE INDEX "players_profile_image_idx" ON "players" USING btree ("profile_image_id");
  CREATE INDEX "players_hero_image_idx" ON "players" USING btree ("hero_image_id");
  CREATE INDEX "players_nationality_idx" ON "players" USING btree ("nationality_id");
  CREATE INDEX "players_primary_role_idx" ON "players" USING btree ("primary_role_id");
  CREATE INDEX "players_current_club_idx" ON "players" USING btree ("current_club_id");
  CREATE INDEX "players_player_status_idx" ON "players" USING btree ("player_status");
  CREATE INDEX "players_status_idx" ON "players" USING btree ("status");
  CREATE INDEX "players_updated_at_idx" ON "players" USING btree ("updated_at");
  CREATE INDEX "players_created_at_idx" ON "players" USING btree ("created_at");
  CREATE INDEX "players_rels_order_idx" ON "players_rels" USING btree ("order");
  CREATE INDEX "players_rels_parent_idx" ON "players_rels" USING btree ("parent_id");
  CREATE INDEX "players_rels_path_idx" ON "players_rels" USING btree ("path");
  CREATE INDEX "players_rels_clubs_id_idx" ON "players_rels" USING btree ("clubs_id");
  CREATE INDEX "players_rels_countries_id_idx" ON "players_rels" USING btree ("countries_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_players_fk" FOREIGN KEY ("players_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_players_id_idx" ON "payload_locked_documents_rels" USING btree ("players_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "players" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "players_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "players" CASCADE;
  DROP TABLE "players_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_players_fk";
  
  DROP INDEX "payload_locked_documents_rels_players_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "players_id";
  DROP TYPE "public"."enum_players_gender";
  DROP TYPE "public"."enum_players_batting_style";
  DROP TYPE "public"."enum_players_bowling_style";
  DROP TYPE "public"."enum_players_player_status";
  DROP TYPE "public"."enum_players_status";`)
}
