import { Link } from "react-router";
import type { Tournament } from "@calice/client";

export default function TournamentList({ tournaments }: { tournaments: Tournament[] }) {
    return (
        <main>
            <header>
                <Link to="/create">Create</Link>
            </header>
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox"></input></th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {tournaments.map(t => (
                        <tr key={t.id}>
                            <td><input type="checkbox"></input></td>
                            <td><Link to={`/${t.id}/edit`}>{t.title}</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>

    )
}