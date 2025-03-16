import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { createTournamentSchema } from '@calice/validators'
import db from "../db"

const router = new Hono()
    .get("/", async (c) => {
        const tournaments = await db.selectFrom("tournament").selectAll().execute()

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

            const newTournament = await db.insertInto("tournament").values(validated).returningAll().executeTakeFirstOrThrow()

            return c.json(newTournament)
        }
    )

export default router