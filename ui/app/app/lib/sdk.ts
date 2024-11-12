import "server-only"

import { cookies } from "next/headers"
import { env } from "@/app/lib/env.mjs"
import { components, paths } from "@/app/lib/calice"

export type ValidPath = keyof paths
export type Tournament = components["schemas"]["TournamentRead"]

export async function get(path: ValidPath) {
    const url = new URL(path, env.API_URL)
    const opts = {
        method: "GET"
    }

    return send(url, opts)
}

async function send(input: URL, opts: RequestInit) {
    const cookieStore = await cookies()
    const cookieHeader = { "Cookie": cookieStore.toString() }

    const response = await fetch(
        input,
        {
            ...opts,
            headers: {
                ...opts.headers,
                ...cookieHeader
            }
        }
    )

    const json = await response.json()

    return json
}