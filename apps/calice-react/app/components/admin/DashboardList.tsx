import { Link } from "react-router"

export default function DashboardList<T extends { id: string }>({ columns, items }: {
    items: T[],
    columns: (keyof T)[]
}) {
    return (
        <section className="flex-grow p-2">
            <header className="flex p-4 bg-gray-100">
                <Link className="bg-green-600 text-white font-semibold px-4 py-2 rounded" to="create">Create</Link>
            </header>
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        {columns.map(c => (
                            <th key={c.toString()}>{c.toString()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map(i => (
                        <tr key={i.id}>
                            <td><input type="checkbox" /></td>
                            {columns.map((c, index) => {
                                const content = i[c] as string

                                return (
                                    <td key={i.id + c.toString()}>
                                        {index === 0 ? (
                                            <Link className="font-semibold" to={`${i.id}/edit`}>{content}</Link>
                                        ) : (content)}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}