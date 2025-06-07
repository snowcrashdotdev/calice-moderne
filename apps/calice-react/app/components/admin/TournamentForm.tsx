import { useFetcher } from "react-router"
import type { Tournament } from "@calice/client";
import TimeInput from "~/components/forms/TimeInput"

export default function TournamentForm({ defaultValues }: { defaultValues?: Tournament }) {
    const fetcher = useFetcher()

    return (
        <fetcher.Form method="post" className="flex flex-col items-start gap-4">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" defaultValue={defaultValues?.title}></input>
            <label htmlFor="description">Description</label>
            <textarea name="description" defaultValue={defaultValues?.description ?? ""}></textarea>
            <fieldset>
                <label htmlFor="startTime">Start</label>
                <TimeInput id="startTime" name="startTime" step="1" defaultValue={defaultValues?.startTime} />
                <label htmlFor="endTime">End</label>
                <TimeInput id="startTime" name="endTime" step="1" defaultValue={defaultValues?.endTime} />
            </fieldset>
            <button type="submit">{defaultValues ? "Update" : "Create"}</button>
        </fetcher.Form>
    )
}