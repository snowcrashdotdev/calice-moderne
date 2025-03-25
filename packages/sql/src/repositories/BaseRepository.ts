import type PublicSchema from "@/public/PublicSchema"
import { Kysely } from "kysely"
import type { Insertable, Updateable, OperandValueExpressionOrList, ReferenceExpression } from "kysely"

type Value<T extends keyof PublicSchema> = OperandValueExpressionOrList<PublicSchema, T, ReferenceExpression<PublicSchema, T>>

export default abstract class BaseRepository<const T extends keyof PublicSchema> {
    readonly abstract table: T

    constructor(private db: Kysely<PublicSchema>) { }

    async insert(update: Insertable<PublicSchema[T]>) {
        return this.db.insertInto(this.table)
            .returningAll()
            .values(update)
            .executeTakeFirstOrThrow()
    }

    async findAll() {
        return this.db.selectFrom(this.table)
            .selectAll()
            .execute()
    }

    async find(id: string) {
        return this.db.selectFrom(this.table)
            .selectAll()
            .where("id", "=", id as Value<T>)
            .executeTakeFirstOrThrow()
    }

    async update(id: string, values: Updateable<PublicSchema[T]>) {
        return this.db.updateTable(this.table)
            .returningAll()
            .where("id", "=", id as Value<typeof this.table>)
            .set(values)
            .executeTakeFirstOrThrow()
    }

    async delete(id: string) {
        return this.db.deleteFrom(this.table)
            .where("id", "=", id as Value<T>)
            .executeTakeFirstOrThrow()
    }
}

export interface RepositoryConstructor<R extends BaseRepository<any>> {
    new(db: Kysely<PublicSchema>): R
}