import "server-only"
import { cookies } from 'next/headers'
import { jwtVerify } from "jose"
import { env } from "@/app/lib/env.mjs"
import { redirect } from "next/navigation"
import { cache } from "react"

const SECRET_KEY = new TextEncoder().encode(env.API_SHARED_SECRET)
const DEFAULT_EXP = () => new Date(Date.now() + 15 * 60 * 100)
export const SESSION_COOKIE = "session"

export async function decrypt(token: string = "") {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
        algorithms: ['HS256']
    })

    return payload
}

export async function createSession(token: string = "") {
    const { exp } = await decrypt(token)
    const cookieStore = await cookies()

    const expires = exp ? new Date(exp * 1000) : DEFAULT_EXP()

    console.debug(exp)
    console.debug(expires)
    console.debug(token)

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

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value

    if (!cookie) {
        redirect("/login")
    }

    const session = await decrypt(cookie)

    if (!session?.sub) {
        redirect("/login")
    }

    return { isAuth: true, user: session.sub }
})