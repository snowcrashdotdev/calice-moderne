"use server"
import request from "@/app/lib/sdk"
import { GameFormSchema, type InferredFormState } from "@/app/lib/validation"
import { redirect } from "next/navigation"

type GameFormState = InferredFormState<typeof GameFormSchema>


export async function create(_state: GameFormState, form: FormData): Promise<GameFormState> {
    const values = Object.fromEntries(form.entries())
    const { data, error } = GameFormSchema.safeParse(values)

    if (error) {
        return {
            errors: error.flatten().fieldErrors,
            values
        }
    } else {
        const { data: _game, error } = await request.POST("/games/", {
            body: data
        })

        if (error) {
            return {
                values,
                message: "Server error"
            }
        } else {
            redirect("/")
        }
    }
}