<script lang="ts">
    import { teamData, teamSwap } from "./scores.state.svelte"
    import SingleScore from "./SingleScore/SingleScore.svelte"

    const leftTeamData = $derived(teamSwap.active ? teamData[1] : teamData[0])
    const rightTeamData = $derived(teamSwap.active ? teamData[0] : teamData[1])
</script>

<div class="flex w-full justify-between gap-4 lg:gap-48">
    <SingleScore teamData={leftTeamData} />
    <div class="flex items-end">
        <button class="btn" onclick={teamSwap.toggle}> Swap </button>
    </div>
    <SingleScore teamData={rightTeamData} invertOrder={true} />
</div>
