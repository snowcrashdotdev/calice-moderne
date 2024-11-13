import { request } from "@/app/lib/sdk"

export default async function TournamentDetails({
    params
}: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    const tournament = await request({
        method: "get",
        path: `/tournaments/{slug}`,
        params: {
            path: { slug }
        }
    })

    return (
        <main className="flex-1 flex flex-col">
            <h1>{tournament.title}</h1>
        </main>
    )
}