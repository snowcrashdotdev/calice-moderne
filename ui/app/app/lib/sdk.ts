import "server-only"

import createClient, { type Middleware } from "openapi-fetch"
import { getAccessToken } from "@/app/lib/session"
import { env } from "@/app/lib/env.mjs"
import { components, paths } from "@/app/lib/calice"

export type Tournament = components["schemas"]["TournamentRead"]

const request = createClient<paths>({ baseUrl: env.API_URL })

const authMiddleware: Middleware = {
    onRequest: async ({ request }) => {
        const accessToken = await getAccessToken()

        if (accessToken) {
            request.headers.set("Authorization", `Bearer ${accessToken}`)
        }

        return request
    }
}

request.use(authMiddleware)

export { request }