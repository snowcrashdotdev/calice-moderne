import { z } from "zod"

export const createTournamentSchema = z.object({
    title: z.string(),
})