import { get } from "@/app/lib/sdk"
import { TournamentList } from "@/app/components/tournament/tournament-list"

export default async function Home() {
  const tournaments = await get("/tournaments/")
  
  return (
    <main>
      <TournamentList tournaments={tournaments} />
    </main>
  )
}
