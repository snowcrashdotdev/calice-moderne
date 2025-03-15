import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

const dialect = new PostgresDialect({
    pool: new Pool({
        database: "postgres",
        host: "localhost",
        user: "postgres",
        password: "calice",
        port: 5432,
        max: 2      
    })
})

export const db = new Kysely({dialect})