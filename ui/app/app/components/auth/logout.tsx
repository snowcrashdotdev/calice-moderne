"use client"

import { logout } from "@/app/actions/auth"

export function Logout() {
    return (
        <form action={logout}>
            <input type="submit">Logout</input>
        </form>
    )
}