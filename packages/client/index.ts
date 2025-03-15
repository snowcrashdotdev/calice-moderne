import { hc } from "hono/client"
import type { RPCCalice } from "@calice/hono"

const client = hc<RPCCalice>("")
export type CaliceClient = typeof client

export default (...args: Parameters<typeof hc>): CaliceClient => hc<RPCCalice>(...args)