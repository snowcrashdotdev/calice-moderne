import type { Game } from "@/app/lib/calice.types";
import { Grid } from "@/app/components/layout";
import { GamePreview, NewGame } from "@/app/components/game"

export function GameGrid({ games }: { games: Game[] }) {
    return (
        <Grid>
            {(games ?? []).map(g => <GamePreview key={g.id} {...g} />)}
            <NewGame />
        </Grid>
    )
}