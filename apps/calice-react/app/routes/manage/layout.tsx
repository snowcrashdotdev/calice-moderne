import { NavLink, Outlet } from "react-router";
import Main from "~/components/layout/Main";

export default function Dashboard() {
    const menu = [
        ["/manage", "Tournaments"],
        ["/manage/games", "Games"]
    ].map(([to, label]) => (
        <li key={label.toLowerCase()}>
            <NavLink to={to} className={({ isActive }) => isActive ? "underline" : ""} end>{label}</NavLink>
        </li>
    ))
    return (
        <Main className="gap-10">
            <aside>
                <ul>
                    {menu}
                </ul>
            </aside>
            <Outlet />
        </Main>
    )
}