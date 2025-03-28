import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("tournament")
        .addColumn("id", "uuid", c => c.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn("title", "varchar", c => c.notNull())
        .addColumn("description", "text")
        .addColumn("startTime", "timestamptz", c => c.notNull())
        .addColumn("endTime", "timestamptz", c => c.notNull())
        .execute()

    await db.schema
        .createTable("game")
        .addColumn("id", "uuid", c => c.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn("title", "varchar", c => c.notNull())
        .addColumn("description", "varchar")
        .addColumn("image", "varchar")
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema
        .dropTable("tournament")
        .execute()

    await db.schema
        .dropTable("game")
        .execute()
}