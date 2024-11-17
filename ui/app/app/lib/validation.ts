import { z } from "zod"

export type InferredErrors<T extends object> = {
    [K in keyof T]?: string[];
}

export const LoginFormSchema = z.object({
    username: z.string(),
    password: z.string(),
    scope: z.string(),
    grant_type: z.literal("password")
})

export const SignupFormSchema = z.object({
    username: z
        .string()
        .min(2, { message: "Username is not long enough." })
        .trim(),
    password: z
        .string()
        .min(8, { message: "Passwords must be at least 8 characters long." })
        .max(64, { message: "Passwords cannot be longer than 64 characters." })
        .trim(),
    confirmPassword: z.string()
}).refine(v => v.password === v.confirmPassword, { message: "Passwords must match", path: ["confirmPassword"] })

export const TournamentFormSchema = z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    startTime: z.coerce.date().transform(d => d.toISOString()),
    endTime: z.coerce.date().transform(d => d.toISOString()),
}).refine(v => v.endTime > v.startTime, { message: "Tournament must have later end time than start time.", path: ["endTime"] })