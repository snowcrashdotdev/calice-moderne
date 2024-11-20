import { Game } from "@/app/lib/calice.types";

export function GamePreview({ title }: Game) {
    return (
        <article className="border border-gray-200 rounded">
            <h2>{title}</h2>
        </article>
    )
}