import type { Route } from "./+types/create";
import TournamentForm from "~/components/admin/TournamentForm";
import { createTournamentSchema, ZodError } from "@calice/validators";
import api from "~/api";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData()

    try {
        const validated = createTournamentSchema.parse(
            Object.fromEntries(formData.entries())
        )

        const res = await api.tournaments.$post({ json: validated })
        return res
    } catch (err) {
        let errors = {}
        if (err instanceof ZodError) {
            errors = err.format()
        }
        return { error: true, errors }
    }
}

export default function CreateTournament(props: Route.ComponentProps) {
    return (
        <main>
            <TournamentForm />
        </main>
    )
}