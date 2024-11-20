"use client"

import { useState } from "react"
import { Dialog } from "@/app/components/layout"
import { GameForm } from "@/app/components/game"

export function NewGame() {
    const [showForm, setShowForm] = useState<boolean>(false)
    return (
        <>
            <div className="border border-gray-400 p-4 rounded text-center cursor-pointer" onClick={() => setShowForm(true)}>
                <p>➕</p>
                <p>Add New</p>
            </div>

            <Dialog onClose={() => setShowForm(false)} open={showForm}><GameForm /></Dialog>
        </>

    )
}