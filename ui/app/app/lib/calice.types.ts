import { type components, UserRole } from "./calice"

export type Tournament = components["schemas"]["TournamentRead"]
export type User = components["schemas"]["UserRead"]
export type AuthResponse = components["schemas"]["AuthResponse"]
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