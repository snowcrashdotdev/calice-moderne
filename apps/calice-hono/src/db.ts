import { getDatabase, TournamentRepository } from "@calice/sql"

const db = getDatabase({
    database: "postgres",
    host: "localhost",
    user: "postgres",
    password: "calice",
    port: 5432,
    max: 10
})

export const tournamentRepository = new TournamentRepository(db)