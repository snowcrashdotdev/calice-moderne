import Repository from "@/repositories/BaseRepository"
import { type NewTournament } from "@/public/Tournament"

export default class TournamentRepository extends Repository {
    protected table = "tournament" as const

    async findAll() {
        return this.db.selectFrom(this.table)
            .selectAll()
            .execute()
    }

    async insert(newTournament : NewTournament) {
        return this.db.insertInto(this.table)
            .values(newTournament)
            .returningAll()
            .executeTakeFirstOrThrow()
    }
}