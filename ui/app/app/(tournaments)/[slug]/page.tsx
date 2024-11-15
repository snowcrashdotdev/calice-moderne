import request from "@/app/lib/sdk"
import { Main } from "@/app/components/layout"

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
        <Main>
            <h1 className="text-2xl font-bold">{tournament.title}</h1>
        </Main>
    )
}