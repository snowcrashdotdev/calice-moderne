import type { User } from "@/app/lib/calice.types";
import { UserRoleSelect } from "@/app/components/user/user-role-select"

export function ManageUser(user: User) {
    const { username } = user
    return (
        <tr>
            <td>{username}</td>
            <td>
                <UserRoleSelect {...user} />
            </td>
        </tr>
    )
}