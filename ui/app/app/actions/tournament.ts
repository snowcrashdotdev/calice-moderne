"use server"

import { revalidatePath } from "next/cache"
import { TournamentFormSchema } from "@/app/lib/validation"
import { request } from "@/app/lib/sdk"
import { redirect } from "next/navigation"

type TournamentFormValues = {
    title: string
    description: string
    startTime: string
    endTime: string
}

type TournamentFormState = {
    values?: TournamentFormValues,
    errors?: {
        title?: string[]
        description?: string[]
        startTime?: string[]
        endTime?: string[]
    },
    message?: string
} | undefined

export async function create(_state: TournamentFormState, formData: FormData) {
    const values = Object.fromEntries(formData.entries()) as any as TournamentFormValues

    const validatedTournamentForm = await TournamentFormSchema.safeParseAsync(values)

    if (validatedTournamentForm.success === false) {
        return {
            values,
            errors: validatedTournamentForm.error.flatten().fieldErrors
        }
    } else {
        const { data: newTournament, error } = await request.POST("/tournaments/", {
            body: validatedTournamentForm.data,
        })

        if (error) {
            return {
                values,
                message: "Encountered server error."
            }
        } else {
            revalidatePath("/")
            redirect(`/${newTournament.slug}`)
        }
    }
}