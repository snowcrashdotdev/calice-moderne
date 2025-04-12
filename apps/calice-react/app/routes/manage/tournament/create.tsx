import type { Route } from "./+types/create";
import TournamentForm from "~/components/admin/TournamentForm";
import { createTournamentSchema, ZodError } from "@calice/validators";
import api from "~/api";
import { redirect } from "react-router";
import Main from "~/components/layout/Main";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData()

    try {
        const validated = createTournamentSchema.parse(
            Object.fromEntries(formData.entries())
        )

        const res = await api.tournaments.$post({ json: validated })

        if (res.ok) {
            const newTournament = await res.json()
            return redirect(`/manage/${newTournament.id}/edit`)
        } else {
            return res
        }
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
        <Main>
            <TournamentForm />
        </Main>
    )
}