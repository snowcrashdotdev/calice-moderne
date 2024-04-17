<script lang="ts">
    import { TournamentBaseForm } from "$components/forms";

    export let form
</script>

<section class="flex-grow">
    <h1 class="text-center">Create new tournament</h1>
    <TournamentBaseForm form={form} />
</section>