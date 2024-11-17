import { Main } from "@/app/components/layout";
import { GameForm } from "@/app/components/game";

export default async function NewGame() {
    return (
        <Main>
            <GameForm />
        </Main>
    )
}