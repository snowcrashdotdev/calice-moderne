import type { Tournament } from "@/app/lib/sdk";
import { TournamentSummary } from "@/app/components/tournament/tournament-summary";
import { NoTournaments } from "@/app/components/tournament/tournament-none";


export function TournamentList({ tournaments }: { tournaments: Tournament[] }) {
    if (tournaments.length === 0) return <NoTournaments />

    return (
        <div>
            {tournaments.map(t => <TournamentSummary key={t.id} tournament={t} />)}
        </div>
    )
}