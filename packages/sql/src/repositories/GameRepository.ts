import Repository from "@/repositories/BaseRepository"

export default class GameRepository extends Repository<"game"> {
    readonly table = "game"
}