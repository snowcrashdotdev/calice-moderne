import { z, ZodError } from "zod"

export const createTournamentSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime()
})

export const updateTournamentSchema = createTournamentSchema.partial()

export const createGameSchema = z.object({
    title: z.string(),
    filename: z.string().optional(),
    imageUrl: z.string().optional()
})

export const updateGameSchema = createTournamentSchema.partial()

export const createRuleSetSchema = z.object({
    narrative: z.string()
})

export { ZodError }