import Repository from "@/repositories/BaseRepository"

export default class TournamentRepository extends Repository<"tournament"> {
    readonly table = "tournament"
}