import Link from "next/link";
import Markdown from "react-markdown";
import type { Tournament } from "@/app/lib/calice.types";
import { at, past } from "@/app/lib/util";

export function TournamentSummary({ slug, title, description, startTime, endTime }: Tournament) {
    const hasStarted = past(startTime)
    const hasEnded = past(endTime)

    return (
        <article className="flex max-w-3xl">
            <div className="basis-2/3">
                <h2 className="text-2xl font-bold underline"><Link href={`/${slug}`}>{title}</Link></h2>
                <Markdown className="prose prose-lg mt-3">{description}</Markdown>
            </div>
            <div className="flex-1 text-sm text-right">
                {false === hasStarted && (
                     <p>Starting: {at(startTime)}</p>
                )}
                {false === hasEnded && (
                    <p className="mt-1">Ends: {at(endTime)}</p>
                )}
                
            </div>
        </article>
    )
}