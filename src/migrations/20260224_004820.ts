import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "documents" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
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
      "focal_y" numeric
    );

    ALTER TABLE "page_content"
      ADD COLUMN IF NOT EXISTS "apply_pdf_file_id" integer;

    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "documents_id" integer;

    DO $$ BEGIN
      ALTER TABLE "page_content"
        ADD CONSTRAINT "page_content_apply_pdf_file_id_documents_id_fk"
        FOREIGN KEY ("apply_pdf_file_id") REFERENCES "public"."documents"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_documents_fk"
        FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "documents_created_at_idx" ON "documents" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "documents_filename_idx" ON "documents" USING btree ("filename");
    CREATE INDEX IF NOT EXISTS "page_content_apply_apply_pdf_file_idx" ON "page_content" USING btree ("apply_pdf_file_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "page_content" DROP COLUMN IF EXISTS "apply_pdf_file_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "documents_id";
    DROP TABLE IF EXISTS "documents" CASCADE;
  `)
}
