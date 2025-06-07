import { faker } from '@faker-js/faker';
import { getDatabase } from './connect'
import { connection } from "../kanelrc"
import type { NewTournament } from './public/Tournament';

export function createRandomTournament() : NewTournament {
    const startTime = faker.date.anytime()
    const endTime = faker.date.soon({refDate: startTime})

    return {
        title: faker.lorem.sentence({ min: 3, max: 5 }),
        startTime,
        endTime
    }
}

const run = async () => {
    const db = getDatabase(connection);
    const tournaments = Array.from({length: 20}, createRandomTournament)

    await db.insertInto("tournament").values(tournaments).execute()
}

run()