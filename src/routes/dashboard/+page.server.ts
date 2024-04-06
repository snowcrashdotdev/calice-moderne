import api from "$lib/api";

export async function load() {
    const tournaments = await api.get('tournaments')

    return { tournaments }
}