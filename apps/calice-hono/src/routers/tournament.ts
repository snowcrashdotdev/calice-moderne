import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { createTournamentSchema, updateTournamentSchema } from '@calice/validators'
import { withTournamentRepository } from '~/db'

const router = new Hono()
    .use(withTournamentRepository)
    .get("/", async (c) => {
        const tournamentRepository = c.get("tournaments")
        const tournaments = await tournamentRepository.findAll()

        return c.json(tournaments)
    })
    .get(
        "/:id",
        async (c) => {
            const { id } = c.req.param()
            const tournamentRepository = c.get("tournaments")
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
            const tournamentRepository = c.get("tournaments")

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
            const tournamentRepository = c.get("tournaments")

            const updatedTournament = await tournamentRepository.update(id, validated)

            return c.json(updatedTournament)
        }
    )
    .delete(
        "/:id", async (c) => {
            const { id } = c.req.param()
            const tournamentRepository = c.get("tournaments")
            const result = await tournamentRepository.delete(id)

            return c.json(result)
        }
    )

export default router