import type { ComponentPropsWithoutRef } from "react";

type FieldsetProps = ComponentPropsWithoutRef<"fieldset">

export default function Fieldset({ children, className, ...props }: FieldsetProps) {
    return (
        <fieldset className={`flex gap-4 ${className ?? ""}`.trim()} {...props}>{children}</fieldset>
    )
}