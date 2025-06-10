import type { ComponentProps } from "react"

type TextInputProps = Omit<ComponentProps<"input">, "type">

export default function TextInput({ className, ...props }: TextInputProps) {
    return <input type="text" className={`border border-gray-400 rounded-sm px-2 py-1 ${className ?? ""}`.trim()} {...props} />
}