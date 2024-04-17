import api from "$lib/api"

export async function load({ params }) {
    const route = `/tournaments/${params.slug}`
    return {
        tournament: await api.get(route)
    }
}