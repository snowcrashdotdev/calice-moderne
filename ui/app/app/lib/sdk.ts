import "server-only"

import { cookies } from "next/headers"
import { env } from "@/app/lib/env.mjs"
import { components, paths } from "@/app/lib/calice"

export type Tournament = components["schemas"]["TournamentRead"]

type Path = Extract<keyof paths, string>
type Method<P extends Path> = Extract<keyof paths[P], string>
type Params<P extends Path, M extends Method<P>> = "parameters" extends keyof paths[P][M] ? paths[P][M]["parameters"] : undefined
type Body<P extends Path, M extends Method<P>> = "requestBody" extends keyof paths[P][M] ? paths[P][M]["requestBody"]["content"]["application/json"] : undefined
type ApiResponse<P extends Path, M extends Method<P>> = paths[P][M]["responses"][200]["content"]["application/json"]

interface ApiRequest<P extends Path, M extends Method<P>> {
    path: P
    method: M
    data?: Body<P, M>,
    params?: Params<P, M> extends undefined ? [] : [Params<P, M>]
}

export async function request<P extends Path, M extends Method<P>>({
    path,
    method,
    data,
    ...params
}: ApiRequest<P, M>): Promise<ApiResponse<P, M>> {
    const cookieStore = await cookies()
    const url = new URL(path, env.API_URL)
    const init: RequestInit = {
        method,
        headers: {
            "Cookie": cookieStore.toString(),
            "Content-Type": "application/json"
        },
        body: data ? JSON.stringify(data) : null,
    }

    const res = await fetch(url, init)

    if (res.status >= 400) {
        throw new Error("Unexpected server error.")
    } else {
        const json = await res.json()

        return json
    }
}