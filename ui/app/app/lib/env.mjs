import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        IMAGE_DOMAINS: z.preprocess(v => String(v).split(",").map(s => s.trim()), z.array(z.string())),
        API_URL: z.string().url()
    },
    experimental__runtimeEnv: process.env
});