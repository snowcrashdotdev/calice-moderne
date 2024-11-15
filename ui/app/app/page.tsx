import request from "@/app/lib/sdk"
import { Main } from "./components/layout"
import { TournamentList } from "@/app/components/tournament/tournament-list"

export default async function Home() {
  const { data: tournaments, error } = await request.GET("/tournaments/")

  return (
    <Main>
      <TournamentList tournaments={tournaments ?? []} />
    </Main>
  )
}
