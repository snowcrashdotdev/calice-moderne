"use client"

import { useActionState, useState } from "react";
import { Editor, Field, Form, Input, Submit } from "@/app/components/form";
import { createOrUpdate } from "@/app/actions/ruleset";
import type { Ruleset } from "@/app/lib/calice.types";

export function RulesetForm({ gameId, edit }: { gameId: string, edit?: Ruleset }) {
    const formAction = createOrUpdate.bind(null, gameId, edit?.id)
    const [state, action] = useActionState(formAction, {
        values: edit
    })
    const [markdown, setMarkdown] = useState<string>("")

    return (
        <Form className="py-4" action={action}>
            <Field label="Title">
                <Input type="text" id="title" name="title" defaultValue={state?.values?.title} />
            </Field>
            <Field label="Description" htmlFor="description">
                <input type="hidden" value={markdown} id="description" name="description"></input>
                <Editor markdown={state?.values?.description ?? ""} onChange={(md) => setMarkdown(md)}/>
            </Field>
            <Submit label={`${edit ? "Update" : "Add"} Ruleset`} />
        </Form>
    )
}