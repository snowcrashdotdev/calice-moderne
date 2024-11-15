"use client";

import { useActionState } from 'react';
import Link from 'next/link';
import { login } from "@/app/actions/auth";
import { Form, Field, Input, Submit } from "@/app/components/form";

export function LoginForm() {
    const [state, action] = useActionState(login, undefined)

    return (
        <Form action={action}>
            {state?.message && (
                <div role="alert">{state.message}</div>
            )}
            <Field label="Username">
                <Input id="username" name="username" type="text" defaultValue={state?.values.username} autoComplete="off" />
            </Field>

            <Field label="Password">
                <Input id="password" name="password" type="password" />
            </Field>

            <Submit label="Sign In" />

            <p>New user? <Link className="text-blue-700 underline" href="/signup">Sign Up</Link></p>
        </Form>
    )
}