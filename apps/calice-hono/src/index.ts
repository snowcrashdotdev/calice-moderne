import { Hono } from 'hono'
import tournaments from "./routers/tournaments"

const app = new Hono()

const routes = app.route("/tournaments", tournaments)

export type RPCCalice = typeof routes

export default app