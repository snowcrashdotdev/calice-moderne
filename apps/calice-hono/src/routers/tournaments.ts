import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { createTournamentSchema } from '@calice/validators'
import { tournamentRepository } from '../db'

const router = new Hono()
    .get("/", async (c) => {
        const tournaments = await tournamentRepository.findAll()

        return c.json(tournaments)
    })
    .post(
        "/",
        zValidator(
            "json",
            createTournamentSchema
        ),
        async (c) => {
            const validated = c.req.valid("json")

            const newTournament = await tournamentRepository.insert(validated)

            return c.json(newTournament)
        }
    )

export default router