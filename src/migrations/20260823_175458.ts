import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "playing_roles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"sort_order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "playing_roles_id" integer;
  CREATE UNIQUE INDEX "playing_roles_name_idx" ON "playing_roles" USING btree ("name");
  CREATE UNIQUE INDEX "playing_roles_slug_idx" ON "playing_roles" USING btree ("slug");
  CREATE INDEX "playing_roles_updated_at_idx" ON "playing_roles" USING btree ("updated_at");
  CREATE INDEX "playing_roles_created_at_idx" ON "playing_roles" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_playing_roles_fk" FOREIGN KEY ("playing_roles_id") REFERENCES "public"."playing_roles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_playing_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("playing_roles_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "playing_roles" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "playing_roles" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_playing_roles_fk";
  
  DROP INDEX "payload_locked_documents_rels_playing_roles_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "playing_roles_id";`)
}
