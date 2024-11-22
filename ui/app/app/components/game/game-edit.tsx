"use client"

import { useState } from "react";
import { Dialog } from "@/app/components/layout"
import { GameForm } from "@/app/components/game"
import { RulesetForm } from "@/app/components/ruleset";
import type { Game } from "@/app/lib/calice.types";
import { GameBlock } from "@/app/components/game";

export function EditGame(game: Game) {
    const [showForm, setShowForm] = useState<boolean>(false)
    const [newRuleset, setNewRuleset] = useState<boolean>(false)

    const handleClose = () => {
        setShowForm(false)
        setNewRuleset(false)
    }

    return (
        <>
            <GameBlock onClick={() => setShowForm(true)} {...game} />
            <Dialog open={showForm} onClose={handleClose}>
                <GameForm edit={game} />

                <section className="mt-8 flex flex-col divide-y divide-solid">
                    {game.rulesets.map(r => <RulesetForm key={r.id} gameId={game.id} edit={r} />)}


                    {newRuleset ? <RulesetForm gameId={game.id} /> : <button className="mt-4 border border-gray-400 p-4 rounded" type="button" onClick={() => setNewRuleset(true)}>New Ruleset</button>}
                </section>

            </Dialog>
        </>
    )
}