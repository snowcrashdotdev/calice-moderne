import { makeKyselyHook, kyselyCamelCaseHook, kyselyTypeFilter } from "kanel-kysely"
import type { Config } from "kanel"

export default {
    connection: {
        database: "postgres",
        host: "localhost",
        user: "postgres",
        password: "calice",
        port: 5432
    },
    outputPath: "./src",
    preRenderHooks: [makeKyselyHook(), kyselyCamelCaseHook],
    typeFilter: kyselyTypeFilter
} satisfies Config