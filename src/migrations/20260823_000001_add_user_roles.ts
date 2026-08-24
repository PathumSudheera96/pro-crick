import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      CREATE TYPE "public"."enum_users_role" AS ENUM('administrator', 'editor');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END
    $$;

    ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "role" varchar;

    UPDATE "users"
      SET "role" = 'administrator'
      WHERE "role" IS NULL;

    ALTER TABLE "users"
      ALTER COLUMN "role" TYPE "public"."enum_users_role"
      USING "role"::"public"."enum_users_role";

    ALTER TABLE "users"
      ALTER COLUMN "role" SET DEFAULT 'editor'::"public"."enum_users_role";

    ALTER TABLE "users"
      ALTER COLUMN "role" SET NOT NULL;

    CREATE INDEX IF NOT EXISTS "users_role_idx" ON "users" USING btree ("role");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "users_role_idx";
    ALTER TABLE "users" DROP COLUMN "role";
    DROP TYPE IF EXISTS "public"."enum_users_role";
  `)
}
