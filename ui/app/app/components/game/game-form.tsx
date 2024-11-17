"use client"
import { useActionState } from "react"
import { create } from "@/app/actions/game"
import { Field, Form, Input, Submit } from "@/app/components/form"

export function GameForm() {
    const [state, action] = useActionState(create, undefined)

    return (
        <Form action={action}>
            <Field label="Game Title" error={state?.errors?.title}>
                <Input id="title" name="title" type="text" defaultValue={state?.values?.title} required />
            </Field>

            <Field label="MAME filename" error={state?.errors?.filename}>
                <Input id="filename" name="filename" type="text" defaultValue={state?.values?.filename} />
            </Field>

            <Submit label="Create Game" />
        </Form>
    )
}