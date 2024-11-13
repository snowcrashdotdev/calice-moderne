import { TournamentForm } from "@/app/components/tournament/tournament-form";

export default async function NewTournament() {
    return (
        <main className="flex-1 flex justify-center items-center">
            <TournamentForm />
        </main>
    )
}