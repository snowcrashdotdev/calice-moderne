import { useFetcher } from "react-router";
import Field from "../forms/Field";
import TextInput from "../forms/TextInput";

export default function GameForm() {
    const fetcher = useFetcher()

    return (
        <fetcher.Form action="post" className="flex flex-col gap-4">
            <Field>
                <label>Title</label>
                <TextInput id="title" name="title" />
            </Field>
            <Field>
                <label>Filename</label>
                <TextInput id="filename" name="filename" />
            </Field>
        </fetcher.Form>
    )
}