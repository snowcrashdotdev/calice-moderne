import request from "@/app/lib/sdk";
import { ManageUser } from "@/app/components/user/user-manage"
import { Main } from "@/app/components/layout";

export default async function UserManagement() {
    const { data: users, error } = await request.GET("/users/")

    if (error) {
        return null
    }

    return (
        <Main>
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
        </Main>
    )
}