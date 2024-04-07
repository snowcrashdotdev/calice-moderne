<script lang="ts">
    import { DashboardMenu } from "$components";
</script>

<div class="flex flex-grow items-stretch self-stretch">
    <aside class="bg-gray-200 p-3 basis-1/6">
        <DashboardMenu />
    </aside>
    <slot />
</div>