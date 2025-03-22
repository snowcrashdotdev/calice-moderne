import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { createTournamentSchema, updateTournamentSchema } from '@calice/validators'
import { tournamentRepository } from '../db'

const router = new Hono()
    .get("/", async (c) => {
        const tournaments = await tournamentRepository.findAll()

        return c.json(tournaments)
    })
    .get(
        "/:id",
        async (c) => {
            const { id } = c.req.param()
            const tournament = await tournamentRepository.find(id)

            return c.json(tournament)
        }
    )
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
    .put(
        "/:id",
        zValidator(
            "json",
            updateTournamentSchema
        ),
        async (c) => {
            const { id } = c.req.param()
            const validated = c.req.valid("json")

            const updatedTournament = await tournamentRepository.update(id, validated)

            return c.json(updatedTournament)
        }
    )
    .delete(
        "/:id", async (c) => {
            const { id } = c.req.param()
            const result = await tournamentRepository.delete(id)

            return c.json(result)
        }
    )

export default router