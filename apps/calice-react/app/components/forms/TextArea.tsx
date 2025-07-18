import type { ComponentPropsWithoutRef } from "react"

type TextAreaProps = ComponentPropsWithoutRef<"textarea">

export default function TextArea({ className, ...props }: TextAreaProps) {
    return (
        <textarea className={`border border-gray-400 rounded-sm ${className ?? ""}`.trim()} {...props} />
    )
}