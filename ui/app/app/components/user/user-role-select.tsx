"use client"
import { type User, UserRole } from "@/app/lib/calice.types";
import { updateRole } from "@/app/actions/user";
import type { ChangeEventHandler } from "react";

export function UserRoleSelect(user: User) {

    const handleRoleChange: ChangeEventHandler<HTMLSelectElement> = async (event) => {
        const newRole = event.target.value as UserRole

        await updateRole({
            ...user,
            role: Array.from(new Set([newRole, ...user.role]))
        })
    }

    return (
        <select
            value={user.role[0]}
            onChange={handleRoleChange}
        >
            {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)}
        </select>
    )
}