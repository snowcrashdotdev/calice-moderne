import { makeKyselyHook, kyselyCamelCaseHook, kyselyTypeFilter } from "kanel-kysely"
import type { Config } from "kanel"
import type { ConnectionConfig } from "pg"

export const connection: ConnectionConfig = {
    database: "postgres",
    host: "localhost",
    user: "postgres",
    password: "calice",
    port: 5432
}

const config: Config = {
    connection,
    outputPath: "./src",
    preRenderHooks: [makeKyselyHook(), kyselyCamelCaseHook],
    typeFilter: kyselyTypeFilter
}

export default config