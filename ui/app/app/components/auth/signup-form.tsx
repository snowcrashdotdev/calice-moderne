"use client";

import { useActionState } from 'react';
import { signup } from "@/app/actions/auth";
import { Form, Field, Input, Submit } from "@/app/components/form";

export function SignupForm() {
    const [state, action] = useActionState(signup, undefined)

    return (
        <Form action={action}>
            {state?.message && (
                <div role="alert">{state.message}</div>
            )}
            <Field label="Username" error={state?.errors?.username}>
                <Input id="username" name="username" type="text" defaultValue={state?.values.username} autoComplete="off" />
            </Field>

            <Field label="Password" error={state?.errors?.password}>
                <Input id="password" name="password" type="password" />
            </Field>

            <Field label="Confirm Password" error={state?.errors?.confirmPassword}>
                <Input id="confirmPassword" name="confirmPassword" type="password" />
            </Field>

            <Submit label="Sign Up" />
        </Form>
    )
}