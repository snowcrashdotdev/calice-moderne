import type { HTMLAttributes } from "react"

export function Main(props: HTMLAttributes<HTMLDivElement>) {
    return <main {...props} className={`container flex-1 mx-auto flex flex-col p-2 ${props.className ?? ""}`.trim()}/>
}