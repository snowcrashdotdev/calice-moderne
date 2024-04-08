<script lang="ts">
    export let data;
</script>

<div class="flex flex-col flex-grow items-stretch p-2">
    {#if data.tournaments.length}
        <header class="flex gap-5 justify-between">
            <h1>Manage Tournaments</h1>
            <a href="/dashboard/tournaments/new">&plus; Create New Tournament</a>
        </header>
        <div class="mt-5 dashboard-table">
        {#each data.tournaments as tournament }
          <div class="flex gap-5">
            <p class="basis-1/3"><a href={`/dashboard/tournaments/${tournament.slug}/edit`}>{tournament.title}</a></p>
            <p class="basis-1/6">{tournament.start}</p>
            <p class="basis-1/6">{tournament.end}</p>
          </div>  
        {/each }
        </div>
    {:else}
        <div class="flex flex-col flex-grow gap-3 items-center justify-center">
            <p>No tournaments found.</p>
            <p><a class="font-semibold bg-orange-400 rounded-2xl text-white px-5 py-2" href="/dashboard/tournaments/new">&plus; Add your first one.</a></p>
        </div>
    {/if}
</div>

<style lang="postcss">
    .dashboard-table > * { @apply px-2 py-3; }
    .dashboard-table > *:nth-child(even) { @apply bg-gray-200; }
</style>