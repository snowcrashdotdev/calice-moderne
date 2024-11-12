"use server";
import { redirect } from "next/navigation";
import { SignupFormSchema } from "@/app/lib/validation";
import { createSession, deleteSession } from "@/app/lib/session";
import { env } from "@/app/lib/env.mjs"

type SignupFormValues = {
    username: string,
    password: string,
    confirmPassword: string
}

type SignupFormState = {
    values?: SignupFormValues,
    errors?: {
        username?: string[]
        password?: string[]
        confirmPassword?: string[]
    }
    message?: string
} | undefined

export async function signup(_state: SignupFormState, formData: FormData) {
    const values = Object.fromEntries(formData.entries()) as any as SignupFormValues
    const validatedSignupForm = await SignupFormSchema.safeParseAsync(values)

    if (!validatedSignupForm.success) {
        return {
            values,
            errors: validatedSignupForm.error.flatten().fieldErrors
        }
    }

    const { username, password } = validatedSignupForm.data

    const res = await fetch(`${env.API_URL.replace(/\/$/, "")}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password })
    })

    if (res.status >= 400) {
        return {
            values,
            message: "Unexpected server error."
        }
    } else {
        redirect("/login")
    }
}

type LoginFormState = {
    values?: {
        username?: string
        password?: string
    },
    message?: string
} | undefined

export async function login(_state: LoginFormState, formData: FormData) {
    const res = await fetch(`${env.API_URL.replace(/\/$/, "")}/token`, {
        method: "POST",
        body: formData
    })

    if (res.status >= 400) {
        return {
            values: {
                username: formData.get("username") as string ?? undefined,
                password: formData.get("password") as string ?? undefined
            },
            message: "Server error."
        }
    } else {
        const { access_token } = await res.json()
        await createSession(access_token)
        redirect("/")
    }
}

export async function logout() {
    await deleteSession()

    redirect("/")
}