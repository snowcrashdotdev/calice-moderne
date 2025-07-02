import { hc, type InferResponseType } from "hono/client"
import type { RPCCalice } from "@calice/hono"

const client = hc<RPCCalice>("")
export type CaliceClient = typeof client
export type Tournament = InferResponseType<typeof client.tournaments[':id']['$get']>
export type Game = InferResponseType<typeof client.games[':id']["$get"]>

export default (...args: Parameters<typeof hc>): CaliceClient => hc<RPCCalice>(...args)