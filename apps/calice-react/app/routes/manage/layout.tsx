import { NavLink, Outlet } from "react-router";
import Main from "~/components/layout/Main";

export default function Dashboard() {
    const menu = [
        ["/manage", "Tournaments"],
        ["/manage/games", "Games"]
    ].map(([to, label]) => (
        <li key={label.toLowerCase()}>
            <NavLink className="block p-3 aria-current:bg-blue-100" to={to}  end>{label}</NavLink>
        </li>
    ))
    return (
        <Main className="gap-10">
            <aside className="p-6">
                <ul className="flex flex-col">
                    {menu}
                </ul>
            </aside>
            <Outlet />
        </Main>
    )
}