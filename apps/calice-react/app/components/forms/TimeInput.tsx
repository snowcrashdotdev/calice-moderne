import { useState, type InputHTMLAttributes } from "react";

export default function TimeInput({ defaultValue, name, ...attrs }: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value"> & {
    defaultValue?: string
}) {
    const [time, setTime] = useState<string>("")

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const datetimeUTC = new Date(e.target.value).toISOString()
        setTime(datetimeUTC)
    }

    const fmtDefaultValue = defaultValue ? new Date(defaultValue).toISOString().replace(/\..+$/, "") : undefined

    return (
        <>
            <input
                {...attrs}
                defaultValue={fmtDefaultValue}
                type="datetime-local"
                onChange={handleChange}
            />
            <input
                type="hidden"
                name={name}
                value={time || defaultValue}
            />
        </>

    )
}