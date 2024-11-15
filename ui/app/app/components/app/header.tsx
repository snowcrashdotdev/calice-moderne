import Link from "next/link";
import { verifySession } from "@/app/lib/session";
import { Logout } from "@/app/components/auth/logout";

export function AppHeader() {
    return (
        <header className="flex justify-between gap-3 px-3 py-4 border-b border-gray-200">
            <Link className="text-lg font-semibold" href="/">Calice 🏆</Link>
            <LoginLogout />
        </header>
    )
}

async function LoginLogout() {
    const session = await verifySession()

    return (
        <nav>
            {session.isAuth ? (
                <Logout />
            ) : (
                <Link href="login">Login</Link>
            )}
        </nav>
    )
}