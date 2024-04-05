import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async () => {
    throw redirect(300, '/dashboard')
}