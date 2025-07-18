import { useFetcher } from "react-router"
import type { Tournament } from "@calice/client";
import { Field, Fieldset, Submit, TextArea, TextInput, TimeInput } from "~/components/forms";

export default function TournamentForm({ defaultValues }: { defaultValues?: Tournament }) {
    const fetcher = useFetcher()

    return (
        <fetcher.Form method="post" className="flex flex-col items-start gap-4">
            <Field>
                <label>Title</label>
                <TextInput id="title" name="title" defaultValue={defaultValues?.title} />
            </Field>

            <Field>
                <label>Description</label>
                <TextArea id="description" name="description" defaultValue={defaultValues?.description ?? ""} />
            </Field>

            <Fieldset>
                <Field>
                    <label>Start</label>
                    <TimeInput id="startTime" name="startTime" step="1" defaultValue={defaultValues?.startTime} />
                </Field>
                <Field>
                    <label>End</label>
                    <TimeInput id="startTime" name="endTime" step="1" defaultValue={defaultValues?.endTime} />
                </Field>
            </Fieldset>

            <Submit>{defaultValues ? "Update" : "Create"}</Submit>
        </fetcher.Form>
    )
}