import { z } from "zod"
import LocalFiles from "./file-writer"

export interface FileHandler {
    upload: (file: File) => Promise<string>
}

export interface AppServices {
    fileHandler: FileHandler
}

const AppServicesSchema: z.ZodType<AppServices> = z.object({
    fileHandler: z.object({
        upload: z.function()
            .args(z.instanceof(Blob))
            .returns(z.promise(z.string().url()))
    })
})

const services: AppServices = {
    fileHandler: LocalFiles
}

export default services
