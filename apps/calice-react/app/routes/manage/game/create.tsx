import type { Route } from "./+types/create"
import { createGameSchema, ZodError } from "@calice/validators";
import GameForm from "~/components/admin/GameForm";
import api from "~/api";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData()

    try {
        const validated = createGameSchema.parse(
            Object.fromEntries(formData.entries())
        )

        const res = await api.games.$post({ json: validated })

        if (res.ok) {
            const newGame = await res.json()
            return redirect(`/manage/games/${newGame.id}`)
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

export default function CreateGame() {
    return (
        <main className="container mx-auto py-10">
            <GameForm />
        </main>
    )
}