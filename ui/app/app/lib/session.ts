import "server-only"
import { cache } from "react"
import { cookies } from 'next/headers'
import type { AuthResponse, AccessToken } from "@/app/lib/calice.types"
import request, { multipartSerializer } from "@/app/lib/sdk"

export const ACCESS_COOKIE = "auth"
export const SESSION_COOKIE = "session"

type Session = {
    authenticated: boolean
    user?: {
        id: string,
        name: string
    }
}

export async function decrypt(token: string = ""): Promise<AccessToken> {
    const [_header, claims, ..._rest] = token.split(".")

    return JSON.parse(Buffer.from(claims, "base64url").toString()) as AccessToken
}

export async function getAccessToken(): Promise<string | undefined> {
    return (await cookies()).get(ACCESS_COOKIE)?.value
}

export async function getRefreshToken(): Promise<string | undefined> {
    return (await cookies()).get(SESSION_COOKIE)?.value
}

export async function createSession(credentials: AuthResponse): Promise<AuthResponse> {
    const { access_token, refresh_token, expires, refresh_token_expires } = credentials
    const cookieStore = await cookies()

    cookieStore.set(
        SESSION_COOKIE,
        refresh_token,
        {
            expires: new Date(refresh_token_expires),
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/"
        }
    )

    cookieStore.set(
        ACCESS_COOKIE,
        access_token,
        {
            expires: new Date(expires),
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/"
        }
    )

    return credentials
}

export async function requiresRefresh(): Promise<boolean> {
    const cookieStore = await cookies()

    return cookieStore.has(SESSION_COOKIE) && !cookieStore.has(ACCESS_COOKIE)
}

export async function refreshSession(): Promise<void> {
    const token = await getRefreshToken()

    if (!token) return

    const { data, error, response: { status } } = await request.POST("/oauth/token", {
        body: {
            grant_type: "refresh_token",
            refresh_token: token,
            scope: ""
        },
        bodySerializer: multipartSerializer
    })

    if (error) {
        if (status === 401) await deleteSession()
    } else {
        await createSession(data)
    }
}

export const useSession = cache(async (): Promise<Session> => {
    const notAuthenticated = { authenticated: false }
    const accessToken = await getAccessToken()

    if (!accessToken) {
        return notAuthenticated
    }

    const claims = await decrypt(accessToken)

    return { authenticated: true, user: { id: claims.sub, name: claims.name } }
})

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete(ACCESS_COOKIE)
    cookieStore.delete(SESSION_COOKIE)
}
