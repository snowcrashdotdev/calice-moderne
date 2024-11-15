"use client"

import { useFormStatus } from 'react-dom'

export function Submit({ label }: { label: string }) {
    const { pending } = useFormStatus()

    return (
        <button className="font-semibold border-2 rounded-lg px-5 py-3 hover:bg-gray-200 transition-colors self-start" disabled={pending} type="submit">{label}</button>
    )
}