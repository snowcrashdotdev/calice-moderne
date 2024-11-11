import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        API_URL: z.string().url(),
        API_SHARED_SECRET: z.string().min(8)
    },
    experimental__runtimeEnv: process.env
});