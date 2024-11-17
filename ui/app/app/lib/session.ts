import "server-only"
import { cookies } from 'next/headers'
import { cache } from "react"
import request, { multipartSerializer } from "@/app/lib/sdk"
import type { AuthResponse, AccessToken } from "./calice.types"

export const ACCESS_COOKIE = "auth"
export const SESSION_COOKIE = "session"

export type ServerSession = {
    token: string
    claims: AccessToken
} | undefined


export async function decrypt(token: string = ""): Promise<AccessToken> {
    const [_header, claims, ..._rest] = token.split(".")

    return JSON.parse(Buffer.from(claims, "base64url").toString()) as AccessToken
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

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete(ACCESS_COOKIE)
    cookieStore.delete(SESSION_COOKIE)
}

async function useRefreshToken(token: string): Promise<ServerSession> {
    const { data, error } = await request.POST("/oauth/token", {
        body: {
            grant_type: "refresh_token",
            refresh_token: token,
            scope: ""
        },
        bodySerializer: multipartSerializer
    })

    if (error) {
        deleteSession()
        return undefined
    } else {
        const { access_token: token } = await createSession(data)
        const claims = await decrypt(token)

        return { token, claims }
    }
}

export async function getAccessToken(): Promise<string | undefined> {
    return (await cookies()).get(ACCESS_COOKIE)?.value
}

export const getSession = cache(async (): Promise<ServerSession> => {
    const cookieStore = await cookies()
    const accessTokenCookie = cookieStore.get(ACCESS_COOKIE)
    const refreshTokenCookie = cookieStore.get(SESSION_COOKIE)

    if (accessTokenCookie) {
        const token = accessTokenCookie.value
        const claims = await decrypt(token)

        return { token, claims }
    } else if (refreshTokenCookie) {
        const claims = await useRefreshToken(refreshTokenCookie.value)

        return claims
    }

    return undefined
})