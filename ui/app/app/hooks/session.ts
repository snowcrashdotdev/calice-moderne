"use server"

import { cache } from "react"
import { cookies } from "next/headers"
import { ACCESS_COOKIE, decrypt } from "@/app/lib/session"

type Session = {
    authenticated: boolean
    user?: {
        id: string,
        name: string
    }
}

export const useSession = cache(async (): Promise<Session> => {
    const notAuthenticated = { authenticated: false }
    const accessToken = (await cookies()).get(ACCESS_COOKIE)?.value

    if (!accessToken) {
        return notAuthenticated
    }

    const claims = await decrypt(accessToken)

    return { authenticated: true, user: { id: claims.sub, name: claims.name } }
})