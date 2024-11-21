import { type components, UserRole } from "./calice.openapi"

export type Tournament = components["schemas"]["TournamentRead"]
export type User = components["schemas"]["UserRead"]
export type AuthResponse = components["schemas"]["AuthResponse"]
export type Game = components["schemas"]["GameRead"]
export type Ruleset = components["schemas"]["RulesetRead"]

export type AccessToken = {
    sub: string
    name: string
    iat: string
    exp: string
    scopes: string
    jti?: string
    iss?: string
    aud?: string
    nbf?: string
}

export { UserRole }