<script lang="ts">
  import "../app.css";
  import { Footer, Header } from "$components";
</script>

<Header />

<main class="flex flex-col flex-grow">
  <slot />
</main>

<Footer />