<script lang="ts">
    import { appData } from "../../app.state.svelte"
    import { leftTeamKey, rightTeamKey, teamData } from "./scores.state.svelte"
    import SingleScore from "./SingleScore/SingleScore.svelte"

    const logoSize = $derived(Math.round(160 * (appData.logoZoom / 100)))
</script>

<div class="flex w-full items-end overflow-hidden">
    <!-- Left logo (desktop only) -->
    <div class="z-0 hidden shrink-0 lg:block" style="width: {logoSize}px;">
        {#if teamData[leftTeamKey()].logo !== null}
            <img
                src={teamData[leftTeamKey()].logoPath}
                alt="Team logo"
                style="max-width: {logoSize}px; max-height: {logoSize}px;"
            />
        {/if}
    </div>

    <!-- Scores (above logos) -->
    <div
        class="relative z-10 flex min-w-0 flex-1 items-end justify-between lg:justify-center"
        style="gap: {Math.max(1, 4 - (appData.scoresZoom - 100) * 0.03)}rem;"
    >
        <SingleScore teamData={teamData[leftTeamKey()]} position={"left"} />
        <SingleScore teamData={teamData[rightTeamKey()]} position={"right"} />
    </div>

    <!-- Right logo (desktop only) -->
    <div class="z-0 hidden shrink-0 lg:block" style="width: {logoSize}px;">
        {#if teamData[rightTeamKey()].logo !== null}
            <img
                src={teamData[rightTeamKey()].logoPath}
                alt="Team logo"
                class="ml-auto"
                style="max-width: {logoSize}px; max-height: {logoSize}px;"
            />
        {/if}
    </div>
</div>
