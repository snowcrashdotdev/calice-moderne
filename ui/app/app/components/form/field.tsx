import React, { type ReactElement, type PropsWithChildren, type ReactNode } from "react";

interface FieldProps extends PropsWithChildren {
    label: string;
    htmlFor?: string;
    error?: string[];
}

const getChildId = (children: ReactNode) => {
    const child = React.Children.only(children) as ReactElement

    if ("id" in child.props) {
        return child.props.id
    }

    return undefined
}

export function Field({ children, label, htmlFor, error }: FieldProps) {
    const id = htmlFor ?? getChildId(children)

    if (id === undefined) throw new Error("A child input with html ID or htmlFor value is required.")

    return (
        <div className="flex flex-col gap-y-2 w-64">
            <label className="font-semibold" htmlFor={id}>{label}</label>
            {children}

            {error && (
                <div role="alert">{error}</div>
            )}
        </div>
    )
}