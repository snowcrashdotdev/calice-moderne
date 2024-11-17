import "server-only"

import createClient, { type Middleware } from "openapi-fetch"
import type { paths } from "@/app/lib/calice"
import { getAccessToken } from "@/app/lib/session"
import { env } from "@/app/lib/env.mjs"

export function multipartSerializer(body: object): FormData {
    const formData = new FormData()
    for (const [name, value] of Object.entries(body)) {
        formData.append(name, value)
    }

    return formData
}

const request = createClient<paths>({ baseUrl: env.API_URL })

const authMiddleware: Middleware = {
    onRequest: async ({ request }) => {
        const token = await getAccessToken()

        if (token) {
            request.headers.set("Authorization", `Bearer ${token}`)
        }

        return request
    }
}

request.use(authMiddleware)

export default request