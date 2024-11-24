import path from "path"
import { writeFile } from "fs/promises"
import type { FileHandler } from "./services"

const MEDIA_PATH = path.join(process.cwd(), "public/uploads")

const LocalFileHandler: FileHandler = {
    upload: async function (file: File) {
        const buffer = Buffer.from(await file.arrayBuffer())

        const filepath = path.join(MEDIA_PATH, file.name)
        await writeFile(filepath, buffer)

        return `http://localhost/uploads/${file.name}`
    }
}

export default LocalFileHandler