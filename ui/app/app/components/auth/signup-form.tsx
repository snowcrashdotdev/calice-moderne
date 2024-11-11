"use client";

import { useActionState } from 'react';
import { signup } from "@/app/actions/auth";
import { Field } from "@/app/components/form/field";
import { Submit } from "@/app/components/form/submit";

export function SignupForm() {
    const [state, action] = useActionState(signup, undefined)

    return (
        <form action={action} className="flex flex-col gap-y-6 justify-items-start items-start">
            {state?.message && (
                <div role="alert">{state.message}</div>
            )}
            <Field label="Username" error={state?.errors?.username}>
                <input id="username" name="username" type="text" defaultValue={state?.values.username}></input>
            </Field>

            <Field label="Password" error={state?.errors?.password}>
                <input id="password" name="password" type="password"></input>
            </Field>

            <Field label="Confirm Password" error={state?.errors?.confirmPassword}>
                <input id="confirmPassword" name="confirmPassword" type="password"></input>
            </Field>

            <Submit label="Sign Up" />
        </form>
    )
}