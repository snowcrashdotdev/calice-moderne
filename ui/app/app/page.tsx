import request from "@/app/lib/sdk"
import { TournamentList } from "@/app/components/tournament/tournament-list"

export default async function Home() {
  const { data: tournaments, error } = await request.GET("/tournaments/")

  return (
    <main>
      <TournamentList tournaments={tournaments ?? []} />
    </main>
  )
}
