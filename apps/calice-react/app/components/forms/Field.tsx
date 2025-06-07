import type { HTMLAttributes, ReactElement } from "react";

type FieldProps = HTMLAttributes<HTMLInputElement> & {
    children: [ReactElement<HTMLLabelElement>, ReactElement<HTMLInputElement>]
}

export default function Field({ children }: FieldProps) {
    const [label, input] = children
    return (
        <div className="flex flex-col self-start gap-2">
            {label}
            {input}
        </div>
    )
}