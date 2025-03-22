import { getDatabase, TournamentRepository, type RepositoryConstructor } from "@calice/sql"
import BaseRepository from "@calice/sql/src/repositories/BaseRepository"
import { createMiddleware } from "hono/factory"

export const connectionConfig = {
    database: "postgres",
    host: "localhost",
    user: "postgres",
    password: "calice",
    port: 5432,
    max: 10
}

function createRepositoryMiddleware<R extends BaseRepository>(handle: string, repository: RepositoryConstructor) {
    return createMiddleware<{
        Variables: {
            [handle]: R
        }
    }>(async (c, next) => {
        const database = getDatabase(connectionConfig)
        c.set(handle, new repository(database))
        await next()
        database.destroy()
    })
}

export const withTournamentRepository = createRepositoryMiddleware<TournamentRepository>("tournaments", TournamentRepository)