import { Pool, type PoolConfig } from 'pg'
import { Kysely, PostgresDialect, CamelCasePlugin } from 'kysely'
import type Database from './Database'

const plugins = [new CamelCasePlugin()]

export const getDatabase = (config: PoolConfig) => {
    const dialect = new PostgresDialect({
        pool: new Pool(config)
    })

    const db = new Kysely<Database>({ dialect, plugins })

    return db
}

export * from "./repositories"