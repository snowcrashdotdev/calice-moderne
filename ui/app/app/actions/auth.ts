"use server";
import { redirect } from "next/navigation";
import request from "@/app/lib/sdk";
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

    const { error } = await request.POST("/signup", {
        body: { username, password }
    })

    if (error) {
        return {
            values,
            message: "Server error encountered."
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
        const { accessToken } = await res.json()
        await createSession(accessToken)
        redirect("/")
    }
}

export async function logout() {
    await deleteSession()

    redirect("/")
}