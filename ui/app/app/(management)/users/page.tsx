import request from "@/app/lib/sdk";
import { ManageUser } from "@/app/components/user/user-manage"

export default async function UserManagement() {
    const { data: users, error } = await request.GET("/users/")

    if (error) {
        return null
    }

    return (
        <main className="flex-1">
            <table className="table-auto">
                <thead>
                    <tr>
                        <td>Username</td>
                        <td>Role</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => <ManageUser key={u.id} {...u} />)}
                </tbody>
            </table>
        </main>
    )
}