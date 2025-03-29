import type { Tournament } from "@calice/client";

export default function Tournament({ tournament }: { tournament: Tournament }) {
    return (
        <main>
            <h1>{tournament.title}</h1>
            <p>Starts: {new Date(tournament.startTime).toLocaleString()}</p>
            <p>Ends: {new Date(tournament.endTime).toLocaleString()}</p>
                {tournament.description && (
                <p>{tournament.description}</p>
            )}
        </main>
    )
}