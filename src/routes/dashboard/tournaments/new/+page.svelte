<form class="flex flex-col gap-2 mx-auto p-4">
    <h1>New Tournament</h1>
    <label for="title">Title</label>
    <input type="text" id="title" name="title">
    <label for="start">Start time</label>
    <input type="datetime-local" id="start" name="start">
    <label for="end">End time</label>
    <input type="datetime-local">
    <label for="description">Description</label>
    <textarea id="description" name="description"></textarea>
    <button type="submit">Create Tournament</button>
</form>