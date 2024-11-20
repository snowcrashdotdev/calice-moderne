import { HTMLAttributes } from "react";

export function Grid({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <section className={`grid grid-cols-6 gap-2 ${className ?? ""}`.trim()} {...props}>{children}</section>
    )
}