import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_player_applications_application_status" AS ENUM('new', 'under_review', 'approved', 'rejected');
  CREATE TABLE "application_uploads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar
  );
  
  CREATE TABLE "player_applications_youtube_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "player_applications_vimeo_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "player_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference_number" varchar NOT NULL,
  	"applicant_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"nationality_id" integer,
  	"cricket_role_id" integer,
  	"current_club_id" integer,
  	"teams_experience" varchar,
  	"statistics" varchar,
  	"biography" varchar NOT NULL,
  	"profile_photo_id" integer,
  	"player_cv_id" integer,
  	"application_status" "enum_player_applications_application_status" DEFAULT 'new' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "application_uploads_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "player_applications_id" integer;
  ALTER TABLE "player_applications_youtube_videos" ADD CONSTRAINT "player_applications_youtube_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."player_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "player_applications_vimeo_videos" ADD CONSTRAINT "player_applications_vimeo_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."player_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "player_applications" ADD CONSTRAINT "player_applications_nationality_id_countries_id_fk" FOREIGN KEY ("nationality_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "player_applications" ADD CONSTRAINT "player_applications_cricket_role_id_playing_roles_id_fk" FOREIGN KEY ("cricket_role_id") REFERENCES "public"."playing_roles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "player_applications" ADD CONSTRAINT "player_applications_current_club_id_clubs_id_fk" FOREIGN KEY ("current_club_id") REFERENCES "public"."clubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "player_applications" ADD CONSTRAINT "player_applications_profile_photo_id_application_uploads_id_fk" FOREIGN KEY ("profile_photo_id") REFERENCES "public"."application_uploads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "player_applications" ADD CONSTRAINT "player_applications_player_cv_id_application_uploads_id_fk" FOREIGN KEY ("player_cv_id") REFERENCES "public"."application_uploads"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "application_uploads_updated_at_idx" ON "application_uploads" USING btree ("updated_at");
  CREATE INDEX "application_uploads_created_at_idx" ON "application_uploads" USING btree ("created_at");
  CREATE UNIQUE INDEX "application_uploads_filename_idx" ON "application_uploads" USING btree ("filename");
  CREATE INDEX "application_uploads_sizes_thumbnail_sizes_thumbnail_file_idx" ON "application_uploads" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "player_applications_youtube_videos_order_idx" ON "player_applications_youtube_videos" USING btree ("_order");
  CREATE INDEX "player_applications_youtube_videos_parent_id_idx" ON "player_applications_youtube_videos" USING btree ("_parent_id");
  CREATE INDEX "player_applications_vimeo_videos_order_idx" ON "player_applications_vimeo_videos" USING btree ("_order");
  CREATE INDEX "player_applications_vimeo_videos_parent_id_idx" ON "player_applications_vimeo_videos" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "player_applications_reference_number_idx" ON "player_applications" USING btree ("reference_number");
  CREATE INDEX "player_applications_nationality_idx" ON "player_applications" USING btree ("nationality_id");
  CREATE INDEX "player_applications_cricket_role_idx" ON "player_applications" USING btree ("cricket_role_id");
  CREATE INDEX "player_applications_current_club_idx" ON "player_applications" USING btree ("current_club_id");
  CREATE INDEX "player_applications_profile_photo_idx" ON "player_applications" USING btree ("profile_photo_id");
  CREATE INDEX "player_applications_player_cv_idx" ON "player_applications" USING btree ("player_cv_id");
  CREATE INDEX "player_applications_application_status_idx" ON "player_applications" USING btree ("application_status");
  CREATE INDEX "player_applications_updated_at_idx" ON "player_applications" USING btree ("updated_at");
  CREATE INDEX "player_applications_created_at_idx" ON "player_applications" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_application_uploads_fk" FOREIGN KEY ("application_uploads_id") REFERENCES "public"."application_uploads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_player_applications_fk" FOREIGN KEY ("player_applications_id") REFERENCES "public"."player_applications"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_application_uploads_id_idx" ON "payload_locked_documents_rels" USING btree ("application_uploads_id");
  CREATE INDEX "payload_locked_documents_rels_player_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("player_applications_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "application_uploads" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "player_applications_youtube_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "player_applications_vimeo_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "player_applications" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "application_uploads" CASCADE;
  DROP TABLE "player_applications_youtube_videos" CASCADE;
  DROP TABLE "player_applications_vimeo_videos" CASCADE;
  DROP TABLE "player_applications" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_application_uploads_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_player_applications_fk";
  
  DROP INDEX "payload_locked_documents_rels_application_uploads_id_idx";
  DROP INDEX "payload_locked_documents_rels_player_applications_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "application_uploads_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "player_applications_id";
  DROP TYPE "public"."enum_player_applications_application_status";`)
}
