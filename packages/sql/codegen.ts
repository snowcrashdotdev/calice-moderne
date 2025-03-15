import { processDatabase } from "kanel"
import config from "./kanelrc"

async function run() {
    await processDatabase(config);
}

run()