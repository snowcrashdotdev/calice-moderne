import { GameRepository, getDatabase, TournamentRepository, type RepositoryConstructor } from "@calice/sql"
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

function createRepositoryMiddleware<H extends string, R extends BaseRepository<any>>(handle: H, repository: RepositoryConstructor<R>) {
    type Context = {
        Variables: {
            [K in H]: R
        }
    }

    return createMiddleware<Context>(async (c, next) => {
        const database = getDatabase(connectionConfig)
        c.set(handle, new repository(database))
        await next()
        database.destroy()
    })
}

export const withTournamentRepository = createRepositoryMiddleware("tournaments", TournamentRepository)

export const withGameRepository = createRepositoryMiddleware("games", GameRepository)