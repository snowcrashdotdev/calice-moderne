import type { paths } from "./calice.d.ts"

export type CaliceHttpMethod = keyof Omit<paths[keyof paths], 'parameters'>

export type CaliceRESTRoute = keyof paths