"use client"

import { logout } from "@/app/actions/auth"

export function Logout() {
    return (
        <form action={logout}>
            <button type="submit">Logout</button>
        </form>
    )
}