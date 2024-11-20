"use server"

import { revalidatePath } from "next/cache"
import request from "@/app/lib/sdk"
import { GameFormSchema, type InferredFormState } from "@/app/lib/validation"

export type GameFormState = InferredFormState<typeof GameFormSchema>


export async function createOrUpdate(id: string | undefined, _state: GameFormState, form: FormData): Promise<GameFormState> {
    const values = Object.fromEntries(form.entries())
    const { data, error } = GameFormSchema.safeParse({
        id,
        ...values
    })

    if (error) {
        return {
            errors: error.flatten().fieldErrors,
            values
        }
    } else {
        if (id) {
            const { data: game, error: serverError } = await request.PATCH("/games/", {
                body: {
                    ...data,
                    id
                }
            })

            if (serverError) {
                return {
                    values,
                    message: "Server error"
                }
            } else {
                revalidatePath("/manage/rulesets")

                return {
                    values: game
                }
            }
        } else {
            const { data: game, error: serverError } = await request.POST("/games/", {
                body: data
            })

            if (serverError) {
                return {
                    values,
                    message: "Server error."
                }
            } else {
                revalidatePath("/manage/rulesets")
                return {
                    values: game
                }
            }
        }
    }
}