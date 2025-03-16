import { getDatabase } from "@calice/sql"

export default getDatabase({
    database: "postgres",
    host: "localhost",
    user: "postgres",
    password: "calice",
    port: 5432,
    max: 10
})