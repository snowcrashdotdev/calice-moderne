import Link from "next/link";
import Markdown from "react-markdown";
import type { Tournament } from "@/app/lib/sdk";

export function TournamentSummary({ slug, title, description }: Tournament) {
    return (
        <div>
            <h2><Link href={`/${slug}`}>{title}</Link></h2>
            <Markdown className="prose">{description}</Markdown>
        </div>
    )
}