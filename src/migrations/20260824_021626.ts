import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_players_statistics_by_format_format" AS ENUM('test', 'odi', 't20', 'list-a', 'first-class');
  CREATE TABLE "players_career_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"highlight" varchar NOT NULL
  );
  
  CREATE TABLE "players_achievements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"achievement" varchar NOT NULL
  );
  
  CREATE TABLE "players_statistics_by_format" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"format" "enum_players_statistics_by_format_format" NOT NULL,
  	"matches" numeric,
  	"runs" numeric,
  	"batting_average" numeric,
  	"highest_score" numeric,
  	"hundreds" numeric,
  	"fifties" numeric,
  	"wickets" numeric,
  	"bowling_average" numeric,
  	"best_bowling" varchar,
  	"economy_rate" numeric
  );
  
  CREATE TABLE "players_youtube_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "players_vimeo_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "players" ADD COLUMN "biography" varchar;
  ALTER TABLE "players" ADD COLUMN "playing_experience" varchar;
  ALTER TABLE "players" ADD COLUMN "player_cv_id" integer;
  ALTER TABLE "players" ADD COLUMN "instagram_url" varchar;
  ALTER TABLE "players" ADD COLUMN "espn_cricinfo_url" varchar;
  ALTER TABLE "players" ADD COLUMN "cricbuzz_url" varchar;
  ALTER TABLE "players" ADD COLUMN "seo_meta_title" varchar;
  ALTER TABLE "players" ADD COLUMN "seo_meta_description" varchar;
  ALTER TABLE "players" ADD COLUMN "seo_canonical_url" varchar;
  ALTER TABLE "players" ADD COLUMN "seo_og_title" varchar;
  ALTER TABLE "players" ADD COLUMN "seo_og_description" varchar;
  ALTER TABLE "players" ADD COLUMN "seo_og_image_id" integer;
  ALTER TABLE "players" ADD COLUMN "seo_index" boolean DEFAULT true;
  ALTER TABLE "players" ADD COLUMN "seo_follow" boolean DEFAULT true;
  ALTER TABLE "players_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "players_career_highlights" ADD CONSTRAINT "players_career_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "players_achievements" ADD CONSTRAINT "players_achievements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "players_statistics_by_format" ADD CONSTRAINT "players_statistics_by_format_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "players_youtube_videos" ADD CONSTRAINT "players_youtube_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "players_vimeo_videos" ADD CONSTRAINT "players_vimeo_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "players_career_highlights_order_idx" ON "players_career_highlights" USING btree ("_order");
  CREATE INDEX "players_career_highlights_parent_id_idx" ON "players_career_highlights" USING btree ("_parent_id");
  CREATE INDEX "players_achievements_order_idx" ON "players_achievements" USING btree ("_order");
  CREATE INDEX "players_achievements_parent_id_idx" ON "players_achievements" USING btree ("_parent_id");
  CREATE INDEX "players_statistics_by_format_order_idx" ON "players_statistics_by_format" USING btree ("_order");
  CREATE INDEX "players_statistics_by_format_parent_id_idx" ON "players_statistics_by_format" USING btree ("_parent_id");
  CREATE INDEX "players_youtube_videos_order_idx" ON "players_youtube_videos" USING btree ("_order");
  CREATE INDEX "players_youtube_videos_parent_id_idx" ON "players_youtube_videos" USING btree ("_parent_id");
  CREATE INDEX "players_vimeo_videos_order_idx" ON "players_vimeo_videos" USING btree ("_order");
  CREATE INDEX "players_vimeo_videos_parent_id_idx" ON "players_vimeo_videos" USING btree ("_parent_id");
  ALTER TABLE "players" ADD CONSTRAINT "players_player_cv_id_media_id_fk" FOREIGN KEY ("player_cv_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "players" ADD CONSTRAINT "players_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "players_rels" ADD CONSTRAINT "players_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "players_player_cv_idx" ON "players" USING btree ("player_cv_id");
  CREATE INDEX "players_seo_seo_og_image_idx" ON "players" USING btree ("seo_og_image_id");
  CREATE INDEX "players_rels_media_id_idx" ON "players_rels" USING btree ("media_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "players_career_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "players_achievements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "players_statistics_by_format" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "players_youtube_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "players_vimeo_videos" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "players_career_highlights" CASCADE;
  DROP TABLE "players_achievements" CASCADE;
  DROP TABLE "players_statistics_by_format" CASCADE;
  DROP TABLE "players_youtube_videos" CASCADE;
  DROP TABLE "players_vimeo_videos" CASCADE;
  ALTER TABLE "players" DROP CONSTRAINT "players_player_cv_id_media_id_fk";
  
  ALTER TABLE "players" DROP CONSTRAINT "players_seo_og_image_id_media_id_fk";
  
  ALTER TABLE "players_rels" DROP CONSTRAINT "players_rels_media_fk";
  
  DROP INDEX "players_player_cv_idx";
  DROP INDEX "players_seo_seo_og_image_idx";
  DROP INDEX "players_rels_media_id_idx";
  ALTER TABLE "players" DROP COLUMN "biography";
  ALTER TABLE "players" DROP COLUMN "playing_experience";
  ALTER TABLE "players" DROP COLUMN "player_cv_id";
  ALTER TABLE "players" DROP COLUMN "instagram_url";
  ALTER TABLE "players" DROP COLUMN "espn_cricinfo_url";
  ALTER TABLE "players" DROP COLUMN "cricbuzz_url";
  ALTER TABLE "players" DROP COLUMN "seo_meta_title";
  ALTER TABLE "players" DROP COLUMN "seo_meta_description";
  ALTER TABLE "players" DROP COLUMN "seo_canonical_url";
  ALTER TABLE "players" DROP COLUMN "seo_og_title";
  ALTER TABLE "players" DROP COLUMN "seo_og_description";
  ALTER TABLE "players" DROP COLUMN "seo_og_image_id";
  ALTER TABLE "players" DROP COLUMN "seo_index";
  ALTER TABLE "players" DROP COLUMN "seo_follow";
  ALTER TABLE "players_rels" DROP COLUMN "media_id";
  DROP TYPE "public"."enum_players_statistics_by_format_format";`)
}
