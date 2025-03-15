import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { createTournamentSchema } from '@calice/validators'

const router = new Hono()
    .get("/", (c) => c.json({ "list": "tournaments" }))
    .post(
        "/",
        zValidator(
            "json",
            createTournamentSchema
        ),
        (c) => {
            const validated = c.req.valid("json")

            return c.json(validated)
        }
    )

export default router