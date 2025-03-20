import type PublicSchema from "@/public/PublicSchema"
import { Kysely } from "kysely"

export default abstract class Repository {
    protected abstract table: keyof PublicSchema

    constructor(protected db: Kysely<PublicSchema>) { }
}