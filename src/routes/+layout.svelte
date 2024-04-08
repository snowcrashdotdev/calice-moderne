<script lang="ts">
  import "../app.css";
  import { Footer, Header } from "$components";
</script>

<svelte:head>
    <title>Tournaments Calice</title> 
</svelte:head>

<Header />

<main class="flex flex-col flex-grow">
  <slot />
</main>

<Footer />