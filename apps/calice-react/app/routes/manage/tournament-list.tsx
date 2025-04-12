import type { Route } from "./+types/tournament-list";
import DashboardList from "~/components/admin/DashboardList";
import api from "~/api"

export async function loader() {
    const res = await api.tournaments.$get()

    if (res.ok) return (await res.json())

    return []
}

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function ManageTournaments({ loaderData }: Route.ComponentProps) {
    return <DashboardList items={loaderData} columns={["title", "startTime", "endTime"]} />;
}
