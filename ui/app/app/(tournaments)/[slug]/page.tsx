import request from "@/app/lib/sdk"

export default async function TournamentDetails({
    params
}: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    const { data: tournament, error } = await request.GET("/tournaments/{slug}", {
        params: { path: { slug } }
    })

    if (tournament === undefined || error) {
        return null
    }

    return (
        <main className="flex-1 flex flex-col">
            <h1>{tournament.title}</h1>
        </main>
    )
}