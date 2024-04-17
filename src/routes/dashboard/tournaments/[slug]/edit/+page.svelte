<script lang=ts>
    import { getContext } from 'svelte';
    import { TournamentBaseForm } from '$components/forms';

    export let form;

    const tournament = getContext('tournament')
</script>

<section class="flex-grow">
    <h1 class="text-center">Edit {$tournament.title}</h1>

    <TournamentBaseForm tournament={$tournament} />
</section>