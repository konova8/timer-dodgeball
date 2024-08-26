<script lang="ts">
    import LogoChoice from "./components/logo-choice/LogoChoice.svelte"
    import {
        leftTeamKey,
        rightTeamKey,
        teamData,
    } from "./components/scores/scores.state.svelte"
    import Scores from "./components/scores/Scores.svelte"

    const resetAllScores = () => {
        for (const data of teamData) {
            data.resetScore()
        }
    }
</script>

<div
    class="flex h-[100dvh] w-[100dvw] flex-col-reverse items-center justify-between bg-gray-950 p-4 text-white lg:flex-col lg:p-12"
>
    <div class="flex w-full items-center justify-between gap-8">
        <LogoChoice teamData={teamData[leftTeamKey()]} />
        <div
            class="grid w-full grid-cols-2 grid-rows-2 items-center justify-center gap-4 lg:flex"
        >
            <button class="btn">Start all</button>
            <button class="btn">Pause all</button>
            <button class="btn" onclick={resetAllScores}>Reset all</button>
            <button class="btn">Last set</button>
        </div>
        <LogoChoice teamData={teamData[rightTeamKey()]} />
    </div>
    <Scores />
</div>
