import { useFetcher } from "react-router";
import Field from "../forms/Field";
import TextInput from "../forms/TextInput";

export default function GameForm() {
    const fetcher = useFetcher()

    return (
        <fetcher.Form method="post" className="flex flex-col gap-6">
            <h1 className="text-lg font-bold">New Game</h1>
            <Field>
                <label>Title</label>
                <TextInput id="title" name="title" />
            </Field>
            <Field>
                <label>Filename</label>
                <TextInput id="filename" name="filename" />
            </Field>
            <button type="submit" className="block border rounded self-start font-semibold px-2 py-3">Create</button>
        </fetcher.Form>
    )
}