type TournamentFormState = {
    values?: {}
    errors?: {}
    message?: string
} | undefined

export async function create(_state: TournamentFormState, formData: FormData) {
    const values = Object.fromEntries(formData.entries())

    return {
        values
    }
}