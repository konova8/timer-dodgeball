<script lang="ts">
    import { appData } from "../../app.state.svelte"
    import { leftTeamKey, rightTeamKey, teamData } from "./scores.state.svelte"
    import SingleScore from "./SingleScore/SingleScore.svelte"
</script>

<div class="flex w-full items-end justify-between gap-4 lg:gap-8">
    <!-- Left logo (desktop only, fixed position, behind scores) -->
    <div
        class="relative z-0 hidden shrink-0 lg:block"
        style="transform: scale({appData.logoZoom /
            100}); transform-origin: left bottom;"
    >
        {#if teamData[leftTeamKey()].logo !== null}
            <img
                src={teamData[leftTeamKey()].logoPath}
                alt="Team logo"
                class="max-h-40 max-w-40"
            />
        {/if}
    </div>

    <!-- Scores (zoomable, above logos) -->
    <div
        class="relative z-10 flex w-full items-end justify-between lg:justify-center"
        style="transform: scale({appData.scoresZoom /
            100}); transform-origin: center bottom; --score-gap: {Math.max(
            0,
            20 -
                (appData.scoresZoom - 100) * 0.5 -
                (appData.logoZoom - 100) * 0.15,
        )}rem;"
    >
        <SingleScore teamData={teamData[leftTeamKey()]} position={"left"} />
        <div class="hidden lg:block" style="width: var(--score-gap);"></div>
        <SingleScore teamData={teamData[rightTeamKey()]} position={"right"} />
    </div>

    <!-- Right logo (desktop only, fixed position, behind scores) -->
    <div
        class="relative z-0 hidden shrink-0 lg:block"
        style="transform: scale({appData.logoZoom /
            100}); transform-origin: right bottom;"
    >
        {#if teamData[rightTeamKey()].logo !== null}
            <img
                src={teamData[rightTeamKey()].logoPath}
                alt="Team logo"
                class="max-h-40 max-w-40"
            />
        {/if}
    </div>
</div>
