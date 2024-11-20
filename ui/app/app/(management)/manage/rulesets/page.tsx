import { Main } from "@/app/components/layout";
import { GameGrid } from "@/app/components/game";
import request from "@/app/lib/sdk";

export default async function ManageRulesets() {
    const { data: games, error } = await request.GET("/games/")

    return (
        <Main>
            <GameGrid games={games ?? []} />
        </Main>
    )
}