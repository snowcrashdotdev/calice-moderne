import { Hono } from 'hono'
import { tournament, game } from "~/routers"

const app = new Hono()

const routes = app
    .route("/tournaments", tournament)
    .route("/games", game)

export type RPCCalice = typeof routes

export default app