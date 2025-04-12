import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { createGameSchema, updateGameSchema } from '@calice/validators'
import { withGameRepository } from '~/db'

const router = new Hono()
    .use(withGameRepository)
    .get("/", async (c) => {
        const games = c.get("games")
        const data = await games.findAll()

        return c.json(data)
    })
    .get("/:id", async (c) => {
        const { id } = c.req.param()
        const games = c.get("games")
        const data = await games.find(id)

        return c.json(data)
    })
    .post(
        "/",
        zValidator(
            "json",
            createGameSchema
        ),
        async (c) => {
            const validated = c.req.valid("json")
            const games = c.get("games")
            const data = await games.insert(validated)

            return c.json(data)
        }
    )
    .put(
        "/:id",
        zValidator(
            "json",
            updateGameSchema
        ),
        async (c) => {
            const { id } = c.req.param()
            const validated = c.req.valid("json")
            const games = c.get("games")
            const data = await games.update(id, validated)

            return c.json(data)
        }
    )
    .delete("/:id", async (c) => {
        const { id } = c.req.param()
        const games = c.get("games")
        const data = await games.delete(id)

        return c.json(data)
    })

export default router