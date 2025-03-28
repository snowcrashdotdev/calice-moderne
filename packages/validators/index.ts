import { z, ZodError } from "zod"

export const createTournamentSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    startTime: z.string().datetime({ local: true }),
    endTime: z.string().datetime({ local: true })
})

export const updateTournamentSchema = createTournamentSchema.partial()
export { ZodError }