import { useFetcher } from "react-router";
import Field from "../forms/Field";

export default function GameForm() {
    const fetcher = useFetcher()

    return (
        <fetcher.Form action="post" className="flex flex-col gap-4">
            <Field>
                <label>Title</label>
                <input type="text" />
            </Field>
        </fetcher.Form>
    )
}