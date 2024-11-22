import type { MouseEventHandler } from "react";
import Image from "next/image";
import type { Game } from "@/app/lib/calice.types";

type GameBlockProps = {
    onClick?: MouseEventHandler<HTMLDivElement>
} & Game

export function GameBlock({ onClick, ...game }: GameBlockProps) {
    return (
        <article onClick={onClick} className="relative p-4 border border-gray-300 rounded text-center cursor-pointer">
            <h2 className="relative z-10">{game.title}</h2>
            {game.imageUrl && (<Image className="z-0 pointer-events-none opacity-30" alt="" src={game.imageUrl} fill={true} />)}
        </article>
    )

}