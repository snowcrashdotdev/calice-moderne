"use server"
import { revalidatePath } from "next/cache"
import request from "@/app/lib/sdk"
import { RulesetFormSchema, type InferredFormState } from "@/app/lib/validation"

export type RulesetFormState = InferredFormState<typeof RulesetFormSchema._def.schema>

export async function createOrUpdate(gameId: string, id: string | undefined, _state: RulesetFormState, form: FormData): Promise<RulesetFormState> {
    const values = Object.fromEntries(form.entries())
    const { data, error } = RulesetFormSchema.safeParse({
        id,
        gameId,
        ...values
    })

    if (error) {
        return {
            values,
            errors: error.flatten().fieldErrors
        }
    }

    if (id) {
        const { data: ruleset, error: _serverError } = await request.PATCH("/rulesets/", {
            body: {
                ...data,
                id
            }
        })

        if (error) {
            return {
                values,
                message: "Server error."
            }
        } else {
            revalidatePath("/manage/rulesets")

            return {
                values: ruleset
            }
        }
    } else {
        const { data: ruleset, error: _serverError } = await request.POST("/rulesets/", {
            body: {
                ...data,
                gameId: data.gameId!
            }
        })

        if (error) {
            return {
                values,
                message: "Server error."
            }
        } else {
            revalidatePath("/manage/rulesets")
            return {
                values: ruleset
            }
        }
    }

}