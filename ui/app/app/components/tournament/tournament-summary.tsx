import Link from "next/link";
import { Tournament } from "@/app/lib/sdk";

export function TournamentSummary({ tournament } : { tournament: Tournament }) {
    return (
        <div>
            <h2><Link href={`/${tournament.slug}`}>{tournament.title}</Link></h2>
        </div>
    )
}