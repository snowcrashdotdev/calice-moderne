import api from "~/api";
import type { Route } from "./+types/update";
import { updateTournamentSchema, ZodError } from "@calice/validators";
import TournamentForm from "~/components/admin/TournamentForm";

export async function action({ request, params }: Route.ActionArgs) {
    const formData = await request.formData()

    try {
        const validated = updateTournamentSchema.parse(
            Object.fromEntries(formData.entries())
        )

        const res = await api.tournaments[":id"].$put({ param: { id: params.id }, json: validated })
        return res
    } catch (err) {
        let errors = {}
        if (err instanceof ZodError) {
            errors = err.format()
        }
        return { error: true, errors }
    }
}

export async function loader({ params: { id } }: Route.LoaderArgs) {
    const res = await api.tournaments[":id"].$get({ param: { id } })
    const tournament = await res.json()

    return tournament
}

export default function UpdateTournament({ loaderData }: Route.ComponentProps) {
    return (
        <main>
            <TournamentForm defaultValues={loaderData} />
        </main>
    )
}