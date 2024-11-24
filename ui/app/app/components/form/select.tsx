import { SelectHTMLAttributes } from "react";

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
    options: { label: string, value: string }[]
}

export function Select({ options, ...props }: SelectProps) {
    return (
        <select {...props}>
            {options.map(({ label, value }) => <option key={label + value} value={value}>{label}</option>)}
        </select>
    )
}