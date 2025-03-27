import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("tournament")
        .addColumn("id", "uuid", c => c.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn("title", "varchar", c => c.notNull())
        .execute()

    await db.schema
        .createTable("game")
        .addColumn("id", "uuid", c => c.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn("title", "varchar", c => c.notNull())
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