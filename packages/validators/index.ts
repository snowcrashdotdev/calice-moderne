import { z } from "zod"

export const createTournamentSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime()
})

export const updateTournamentSchema = createTournamentSchema.partial()