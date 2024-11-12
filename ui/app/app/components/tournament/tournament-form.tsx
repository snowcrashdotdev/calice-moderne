"use client"

import { useActionState, useState } from 'react';
import { create } from "@/app/actions/tournament"
import { Field } from "@/app/components/form/field";
import { Submit } from "@/app/components/form/submit";
import Editor from "@/app/components/form/editor";


export function TournamentForm() {
    const [state, action] = useActionState(create, undefined)
    const [markdown, setMarkdown] = useState("")

    return (
        <form action={action}>
            <Field label="Title">
                <input id="title" name="title" type="text"></input>
            </Field>

            <Field label="Description" htmlFor="description">
                <input type="hidden" value={markdown} id="description" name="description"></input>
                <Editor markdown="" onChange={setMarkdown} />
            </Field>

            <Submit label="Create Tournament" />
        </form>
    )
}