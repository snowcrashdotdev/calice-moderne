"use client"
import { useActionState } from "react"
import { createOrUpdate } from "@/app/actions/game"
import { Field, Form, Input, Submit } from "@/app/components/form"
import { Game } from "@/app/lib/calice.types"

export function GameForm({ edit }: { edit?: Game }) {
    const formAction = createOrUpdate.bind(null, edit?.id)
    const [state, action] = useActionState(formAction, {
        values: edit
    })

    return (
        <Form action={action}>
            <Field label="Game Image">
                <Input id="image" name="image" type="file" />
            </Field>
            <Field label="Game Title" error={state?.errors?.title}>
                <Input id="title" name="title" type="text" defaultValue={state?.values?.title} required />
            </Field>

            <Field label="MAME filename" error={state?.errors?.filename}>
                <Input id="filename" name="filename" type="text" defaultValue={state?.values?.filename} />
            </Field>

            <Submit label={`${edit ? "Update" : "Add"} Game`} />
        </Form>
    )
}