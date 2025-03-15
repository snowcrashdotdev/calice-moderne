import { Hono } from 'hono'
import tournaments from "./routers/tournaments"

const app = new Hono()

const routes = app.route("/tournaments", tournaments)

export default app

export type RPCCalice = typeof routes