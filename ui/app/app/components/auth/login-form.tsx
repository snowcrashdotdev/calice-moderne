"use client";

import { useActionState } from 'react';
import { login } from "@/app/actions/auth";
import { Field } from "@/app/components/form/field";
import { Submit } from "@/app/components/form/submit";

export function LoginForm() {
    const [state, action] = useActionState(login, undefined)

    return (
        <form action={action} className="flex flex-col gap-y-6 justify-items-start items-start">
            {state?.message && (
                <div role="alert">{state.message}</div>
            )}
            <Field label="Username">
                <input id="username" name="username" type="text" defaultValue={state?.values.username}></input>
            </Field>

            <Field label="Password">
                <input id="password" name="password" type="password"></input>
            </Field>

            <Submit label="Sign In" />
        </form>
    )
}