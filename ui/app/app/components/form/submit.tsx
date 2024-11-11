"use client"

import { useFormStatus } from 'react-dom'

export function Submit({ label }: { label: string }) {
    const { pending } = useFormStatus()

    return (
        <button disabled={pending} type="submit">{label}</button>
    )
}