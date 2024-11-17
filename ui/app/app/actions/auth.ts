"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import request, { multipartSerializer } from "@/app/lib/sdk";
import { LoginFormSchema, SignupFormSchema, type InferredErrors } from "@/app/lib/validation";
import { createSession, deleteSession, getSession } from "@/app/lib/session";

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

    const { error } = await request.POST("/users/", {
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
    values?: { username?: string; }
    errors?: InferredErrors<z.infer<typeof LoginFormSchema>>
    message?: string
} | undefined

export async function login(_state: LoginFormState, formData: FormData): Promise<LoginFormState> {
    const { data, error } = LoginFormSchema.safeParse(
        {
            ...Object.fromEntries(formData.entries()),
            scope: "",
            grant_type: "password"
        }
    )

    if (error) {
        return {
            errors: error.flatten().fieldErrors,
            values: {
                username: formData.get("username") as string ?? undefined
            }
        }
    }

    const { data: credentials, error: serverError, response } = await request.POST("/oauth/token", {
        body: data,
        bodySerializer: multipartSerializer
    })

    if (serverError) {
        return {
            message: "Login failed"
        }
    } else {
        await createSession(credentials)
        redirect("/")
    }
}

export async function logout() {
    await deleteSession()

    redirect("/")
}