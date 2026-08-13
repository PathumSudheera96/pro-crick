import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_playing_roles_status" AS ENUM('active', 'inactive');
  CREATE TYPE "public"."enum_countries_status" AS ENUM('active', 'inactive');
  CREATE TYPE "public"."enum_clubs_status" AS ENUM('active', 'inactive');
  CREATE TABLE "playing_roles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"status" "enum_playing_roles_status" DEFAULT 'active' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "countries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"country_code" varchar,
  	"status" "enum_countries_status" DEFAULT 'active' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "clubs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"country_id" integer,
  	"status" "enum_clubs_status" DEFAULT 'active' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "playing_roles_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "countries_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "clubs_id" integer;
  ALTER TABLE "clubs" ADD CONSTRAINT "clubs_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "playing_roles_name_idx" ON "playing_roles" USING btree ("name");
  CREATE UNIQUE INDEX "playing_roles_slug_idx" ON "playing_roles" USING btree ("slug");
  CREATE INDEX "playing_roles_updated_at_idx" ON "playing_roles" USING btree ("updated_at");
  CREATE INDEX "playing_roles_created_at_idx" ON "playing_roles" USING btree ("created_at");
  CREATE UNIQUE INDEX "countries_name_idx" ON "countries" USING btree ("name");
  CREATE UNIQUE INDEX "countries_slug_idx" ON "countries" USING btree ("slug");
  CREATE INDEX "countries_updated_at_idx" ON "countries" USING btree ("updated_at");
  CREATE INDEX "countries_created_at_idx" ON "countries" USING btree ("created_at");
  CREATE UNIQUE INDEX "clubs_name_idx" ON "clubs" USING btree ("name");
  CREATE UNIQUE INDEX "clubs_slug_idx" ON "clubs" USING btree ("slug");
  CREATE INDEX "clubs_country_idx" ON "clubs" USING btree ("country_id");
  CREATE INDEX "clubs_updated_at_idx" ON "clubs" USING btree ("updated_at");
  CREATE INDEX "clubs_created_at_idx" ON "clubs" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_playing_roles_fk" FOREIGN KEY ("playing_roles_id") REFERENCES "public"."playing_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clubs_fk" FOREIGN KEY ("clubs_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_playing_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("playing_roles_id");
  CREATE INDEX "payload_locked_documents_rels_countries_id_idx" ON "payload_locked_documents_rels" USING btree ("countries_id");
  CREATE INDEX "payload_locked_documents_rels_clubs_id_idx" ON "payload_locked_documents_rels" USING btree ("clubs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "playing_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "countries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clubs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "playing_roles" CASCADE;
  DROP TABLE "countries" CASCADE;
  DROP TABLE "clubs" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_playing_roles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_countries_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_clubs_fk";
  
  DROP INDEX "payload_locked_documents_rels_playing_roles_id_idx";
  DROP INDEX "payload_locked_documents_rels_countries_id_idx";
  DROP INDEX "payload_locked_documents_rels_clubs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "playing_roles_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "countries_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "clubs_id";
  DROP TYPE "public"."enum_playing_roles_status";
  DROP TYPE "public"."enum_countries_status";
  DROP TYPE "public"."enum_clubs_status";`)
}
