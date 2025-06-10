import { useState } from "react"
import { Link } from "react-router"

const toTitleCase = (s: string) =>
    s.replace(/([A-Z][a-z]|[A-Z]+(?=[A-Z]|$))/g, " $1")
        .replace(/./, m => m.toUpperCase())
        .trim()
    ;

export default function DashboardList<T extends { id: string }>({ columns, items }: {
    items: T[],
    columns: (keyof T)[]
}) {
    const [selected, setSelected] = useState<Set<string>>(new Set())

    return (
        <section className="flex-grow p-2">
            <header className="flex p-4 bg-gray-100">
                <Link className="bg-green-600 text-white font-semibold px-4 py-2 rounded" to="create">Create</Link>
            </header>
            <table className="w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 pl-1"><input type="checkbox" checked={items.length > 0 && (selected.size === items.length) ? true : false} onChange={(e) => {
                            const isCheckedNow = e.currentTarget.checked
                            const selectedItems = false === isCheckedNow ? [] : items.map(i => i.id)
                            setSelected(new Set(selectedItems))
                        }} /></th>
                        {columns.map(c => (
                            <th className="p-2" key={c.toString()}>{toTitleCase(c.toString())}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map(i => (
                        <tr key={i.id}>
                            <td className="p-1"><input type="checkbox" checked={selected.has(i.id) ? true : false} onChange={(e) => {
                                if (e.currentTarget.checked) {
                                    setSelected(new Set([...selected, i.id]))
                                } else {
                                    if (selected.delete(i.id)) {
                                        setSelected(new Set([...selected]))
                                    }
                                }
                            }} /></td>
                            {columns.map((c, index) => {
                                const content = i[c] as string

                                return (
                                    <td className="p-1" key={i.id + c.toString()}>
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