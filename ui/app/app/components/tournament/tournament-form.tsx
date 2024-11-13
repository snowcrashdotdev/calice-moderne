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
        <form action={action} className="flex flex-col gap-y-5 items-start justify-start">
            <Field label="Title" error={state?.errors?.title}>
                <input id="title" name="title" type="text" defaultValue={state?.values?.title}></input>
            </Field>

            <Field label="Start Time" error={state?.errors?.startTime}>
                <input id="startTime" name="startTime" type="datetime-local" defaultValue={state?.values?.startTime}></input>
            </Field>

            <Field label="End Time" error={state?.errors?.endTime}>
                <input id="endTime" name="endTime" type="datetime-local" defaultValue={state?.values?.endTime}></input>
            </Field>

            <Field label="Description" htmlFor="description" error={state?.errors?.description}>
                <input type="hidden" value={markdown} id="description" name="description"></input>
                <Editor markdown={state?.values.description ?? ""} onChange={setMarkdown} />
            </Field>

            <Submit label="Create Tournament" />
        </form>
    )
}