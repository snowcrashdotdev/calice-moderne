import { TournamentForm } from "@/app/components/tournament/tournament-form";
import { Main } from "@/app/components/layout";

export default async function NewTournament() {
    return (
        <Main>
            <TournamentForm />
        </Main>
    )
}