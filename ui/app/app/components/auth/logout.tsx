"use client"
import { Submit } from "@/app/components/form/submit"
import { logout } from "@/app/actions/auth"

export function Logout() {
    return (
        <form action={logout}>
            <Submit label="Logout" />
        </form>
    )
}