import type { HTMLAttributes, ReactElement } from "react";
import React from "react";

type FieldProps = HTMLAttributes<HTMLInputElement> & {
    children: [ReactElement<HTMLLabelElement>, ReactElement<HTMLInputElement>]
}

export default function Field({ children }: FieldProps) {
    const [label, input] = children

    return (
        <div className="flex flex-col self-start gap-2">
            {React.cloneElement(label, {
                htmlFor: input.props.id,
                className: `font-semibold ${label.props.className ?? ""}`.trim()
            })}
            {input}
        </div>
    )
}