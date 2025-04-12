import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("tournament")
        .addColumn("id", "uuid", c => c.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn("title", "varchar", c => c.notNull())
        .addColumn("description", "text")
        .addColumn("startTime", "timestamp", c => c.notNull())
        .addColumn("endTime", "timestamp", c => c.notNull())
        .execute()

    await db.schema
        .createTable("game")
        .addColumn("id", "uuid", c => c.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn("title", "varchar", c => c.notNull())
        .addColumn("filename", "varchar")
        .addColumn("imageUrl", "varchar")
        .execute()

    await db.schema
        .createTable("ruleset")
        .addColumn("narrative", "text", c => c.notNull())
        .execute()

}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema
        .dropTable("ruleset")
        .execute()

    await db.schema
        .dropTable("game")
        .execute()

    await db.schema
        .dropTable("tournament")
        .execute()
}