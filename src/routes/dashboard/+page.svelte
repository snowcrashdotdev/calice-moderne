<script lang="ts">
    export let data;
</script>

<div class="flex flex-col flex-grow gap-3 items-center justify-center">
    {#if data.tournaments.length}
        <p>Coming soon..</p>
    {:else}
        <p>No tournaments found.</p>
        <p><a class="font-semibold bg-orange-400 rounded-2xl text-white px-5 py-2" href="/dashboard/tournaments/new">&plus; Add your first one.</a></p>
    {/if}
</div>