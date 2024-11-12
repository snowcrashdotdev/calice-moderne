import { request } from "@/app/lib/sdk"
import { TournamentList } from "@/app/components/tournament/tournament-list"

export default async function Home() {
  const tournaments = await request({
    path: "/tournaments/",
    method: "get"
  })
  
  return (
    <main>
      <TournamentList tournaments={tournaments} />
    </main>
  )
}
