import type { Tournament } from "@/app/lib/calice.types";
import { TournamentSummary } from "@/app/components/tournament/tournament-summary";
import { NoTournaments } from "@/app/components/tournament/tournament-none";


export function TournamentList({ tournaments }: { tournaments: Tournament[] }) {
    if (tournaments.length === 0) return <NoTournaments />

    return (
        <div className="flex flex-col gap-y-11">
            {tournaments.map(t => <TournamentSummary key={t.id} {...t} />)}
        </div>
    )
}