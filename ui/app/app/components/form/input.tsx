"use client"

import type { InputHTMLAttributes } from "react"

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} className="border-2 border-gray-300 rounded px-3 py-2 hover:border-gray-400 focus:border-transparent" />
}