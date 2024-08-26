<script lang="ts">
    import {
        leftTeamKey,
        rightTeamKey,
        teamData,
        teamSwap,
    } from "./scores.state.svelte"
    import SingleScore from "./SingleScore/SingleScore.svelte"
</script>

<div class="flex w-full justify-between gap-4 lg:gap-48">
    <SingleScore teamData={teamData[leftTeamKey()]} position={"left"} />
    <div class="flex items-end">
        <button class="btn" onclick={teamSwap.toggle}>Swap</button>
    </div>
    <SingleScore teamData={teamData[rightTeamKey()]} position={"right"} />
</div>
