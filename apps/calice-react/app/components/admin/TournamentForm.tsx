import { useFetcher } from "react-router"
import TimeInput from "~/components/forms/TimeInput"

export default function TournamentForm() {
    const fetcher = useFetcher()
    return (
        <fetcher.Form method="post" className="flex flex-col items-start gap-4">
            {fetcher.state}
            {JSON.stringify(fetcher.data)}
            <label htmlFor="title">Title</label>
            <input type="text" name="title"></input>
            <label htmlFor="description">Description</label>
            <textarea name="description"></textarea>
            <fieldset>
                <label htmlFor="startTime">Start</label>
                <TimeInput id="startTime" name="startTime" step="1" />
                <label htmlFor="endTime">End</label>
                <TimeInput id="startTime" name="endTime" step="1" />
            </fieldset>
            <button type="submit">Create</button>
        </fetcher.Form>
    )
}