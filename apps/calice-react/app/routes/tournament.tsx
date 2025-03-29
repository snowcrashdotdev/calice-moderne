import type { Route } from "./+types/tournament";
import Tournament from "~/components/Tournament";
import api from "~/api";

export async function loader({ params: { id } }: Route.LoaderArgs) {
    const res = await api.tournaments[":id"].$get({ param: { id } })
    const tournament = await res.json()

    return tournament
}

export default function ShowTournament({loaderData} : Route.ComponentProps) {
    return <Tournament tournament={loaderData} />
}