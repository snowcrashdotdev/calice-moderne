<script lang="ts">
    import { enhance } from "$app/forms";
    export let tournament = {};

    const handle = async ({ update }) => await update({ reset: false })
</script>

<form use:enhance={() => handle} method="POST" class="flex flex-col gap-2">
    {#if tournament?._id}
        <input type="hidden" name="_id" value={tournament._id}>
    {/if }
    <label for="title">Title</label>
    <input type="text" id="title" name="title" value={tournament?.title ?? ''}>
    <label for="start">Start time</label>
    <input type="datetime-local" id="start" name="start" value={tournament?.start ?? ''}>
    <label for="end">End time</label>
    <input type="datetime-local" id="end" name="end" value={tournament?.end ?? ''}>
    <label for="description">Description</label>
    <textarea id="description" name="description" value={tournament?.description ?? ''}></textarea>
    <button type="submit">Save</button>
</form>