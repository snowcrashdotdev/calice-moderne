import type { JSX } from "react";

export default function Main({ children, className }: { children: JSX.Element | JSX.Element[], className?: string }) {
    return (
        <main className={`flex container mx-auto ${className ?? ""}`.trim()}>
            {children}
        </main>
    )
}