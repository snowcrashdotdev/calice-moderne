import { faker } from '@faker-js/faker';
import { getDatabase } from './connect'
import { connection } from "../kanelrc"
import type { NewTournament } from './public/Tournament';

export function createRandomTournament(): NewTournament {
    const startTime = faker.date.anytime()
    const endTime = faker.date.soon({ refDate: startTime })
    const title = faker.lorem.words({ min: 3, max: 6 }).split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

    return {
        title,
        startTime,
        endTime
    }
}

const run = async () => {
    const db = getDatabase(connection);
    const tournaments = Array.from({ length: 20 }, createRandomTournament)

    await db.insertInto("tournament").values(tournaments).execute()
}

run()