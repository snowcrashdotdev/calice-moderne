import type { Game } from "@/app/lib/calice.types";
import { Grid } from "@/app/components/layout";
import { EditGame, NewGame } from "@/app/components/game"

export function GameGrid({ games }: { games: Game[] }) {
    return (
        <Grid>
            {(games ?? []).map(g => <EditGame key={g.id} {...g} />)}
            <NewGame />
        </Grid>
    )
}