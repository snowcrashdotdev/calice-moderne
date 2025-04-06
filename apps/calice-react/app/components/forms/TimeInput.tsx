import { useState, type InputHTMLAttributes } from "react";

export default function TimeInput({ defaultValue, name, ...attrs }: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value"> & {
    defaultValue?: string
}) {
    const [time, setTime] = useState<string>("")

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const datetimeUTC = new Date(e.target.value).toISOString()
        setTime(datetimeUTC)
    }
    return (
        <>
            <input
                {...attrs}
                defaultValue={defaultValue}
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