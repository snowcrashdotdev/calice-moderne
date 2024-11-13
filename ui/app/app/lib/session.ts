import "server-only"
import { cookies } from 'next/headers'
import { cache } from "react"

const DEFAULT_EXP = () => new Date(Date.now() + 15 * 60 * 100)
export const SESSION_COOKIE = "session"

type TokenData = {
    sub: string
    exp: number
}

export async function decrypt(token: string = "") {
    const [_header, claims, ..._rest] = token.split(".")

    return JSON.parse(Buffer.from(claims, "base64url").toString()) as TokenData
}

export async function createSession(token: string = "") {
    const { exp } = await decrypt(token)
    const cookieStore = await cookies()

    const expires = exp ? new Date(exp * 1000) : DEFAULT_EXP()

    cookieStore.set(
        SESSION_COOKIE,
        token,
        {
            expires,
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/"
        }
    )
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete(SESSION_COOKIE)
}

type Session = {
    isAuth: boolean
    user?: string
}

export const getAccessToken = cache(async (): Promise<string | undefined> => {
    return (await cookies()).get('session')?.value
})

export const verifySession = cache(async (): Promise<Session> => {
    const notAuthenticated = { isAuth: false }
    const cookie = await getAccessToken()

    if (!cookie) {
        return notAuthenticated
    }

    const session = await decrypt(cookie)

    if (!session?.sub) {
        return notAuthenticated
    }

    return { isAuth: true, user: session.sub }
})