import { updateGameSchema, ZodError } from "@calice/validators";
import GameForm from "~/components/admin/GameForm";
import api from "~/api";
import type { Route } from "./+types/update";

export async function action({ request, params }: Route.ActionArgs) {
    const formData = await request.formData()

    try {
        const validated = updateGameSchema.parse(
            Object.fromEntries(formData.entries())
        )

        const res = await api.games[":id"].$put({ param: { id: params.id }, json: validated })
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
    const res = await api.games[":id"].$get({ param: { id } })
    const game = await res.json()

    return game
}

export default function CreateGame({ loaderData }: Route.ComponentProps) {
    return (
        <main className="container mx-auto py-10">
            <GameForm  defaultValues={loaderData} />
        </main>
    )
}