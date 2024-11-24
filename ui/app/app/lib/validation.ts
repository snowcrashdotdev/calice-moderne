import { z } from "zod"
import { RulesetType } from "@/app/lib/calice.openapi"

export type InferredFormState<S extends z.ZodObject<any, any, any>> = {
    errors?: { [Key in keyof z.infer<S>]?: string[] },
    values?: Partial<z.infer<S>>,
    message?: string
} | undefined


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

const BaseResourceSchema = z.object({
    id: z.string().optional(),
    title: z.string().max(64),
    slug: z.string().max(64).optional(),
})

export const TournamentFormSchema = BaseResourceSchema.merge(
    z.object({
        description: z.string().max(512),
        startTime: z.coerce.date().transform(d => d.toISOString()),
        endTime: z.coerce.date().transform(d => d.toISOString()),
    })).refine(v => v.endTime > v.startTime, { message: "Tournament must have later end time than start time.", path: ["endTime"] })

export const GameFormSchema = BaseResourceSchema.merge(
    z.object({
        imageUrl: z.string().url().optional(),
        filename: z.string().max(64).optional()
    })
)

export const RulesetFormSchema = BaseResourceSchema.omit({ slug: true }).merge(
    z.object({
        gameId: z.string().optional(),
        type: z.nativeEnum(RulesetType),
        description: z.string(),
    }
    )).refine(r => r.id || r.gameId, { message: "You must provide a game ID (create) or ruleset ID (update)" })