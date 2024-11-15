"use client"

import { useActionState, useState } from 'react';
import { create } from "@/app/actions/tournament"
import { Form, Field, Input, Submit } from "@/app/components/form";
import Editor from "@/app/components/form/editor";


export function TournamentForm() {
    const [state, action] = useActionState(create, undefined)
    const [markdown, setMarkdown] = useState("")

    return (
        <Form action={action} className="flex flex-col gap-y-5 items-start justify-start">
            <Field label="Title" error={state?.errors?.title}>
                <Input id="title" name="title" type="text" defaultValue={state?.values?.title} />
            </Field>

            <Field label="Start Time" error={state?.errors?.startTime}>
                <Input id="startTime" name="startTime" type="datetime-local" defaultValue={state?.values?.startTime} />
            </Field>

            <Field label="End Time" error={state?.errors?.endTime}>
                <Input id="endTime" name="endTime" type="datetime-local" defaultValue={state?.values?.endTime} />
            </Field>

            <Field label="Description" htmlFor="description" error={state?.errors?.description}>
                <input type="hidden" value={markdown} id="description" name="description"></input>
                <Editor markdown={state?.values.description ?? ""} onChange={setMarkdown} />
            </Field>

            <Submit label="Create Tournament" />
        </Form>
    )
}