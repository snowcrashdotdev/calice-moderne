import type { ComponentPropsWithoutRef } from "react"

type SubmitProps = Omit<ComponentPropsWithoutRef<"button">, "type">

export default function Submit({ children, className, ...props }: SubmitProps) {
    return (<button type="submit" className={`border border-blue-400 text-blue-400 font-semibold px-3 py-1 rounded-lg ${className ?? ""}`.trim()} {...props}>{children}</button>)
}