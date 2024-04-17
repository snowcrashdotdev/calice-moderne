<script lang="ts">
    import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

    export let data;

    const tournament = writable()

    tournament.set(data.tournament)

    setContext('tournament', tournament)
</script>

<slot />