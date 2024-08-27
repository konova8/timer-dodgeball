<script lang="ts">
    import LogoChoice from "./components/logo-choice/LogoChoice.svelte"
    import {
        leftTeamKey,
        rightTeamKey,
        teamData,
    } from "./components/scores/scores.state.svelte"
    import Scores from "./components/scores/Scores.svelte"
    import { setTimer, timeTimer } from "./components/timer/timer.state.svelte"
    import Timer from "./components/timer/Timer.svelte"

    const startAll = () => {
        setTimer.start()
        timeTimer.start()
    }

    const pauseAll = () => {
        setTimer.pause()
        timeTimer.pause()
    }

    const resetAll = () => {
        for (const data of teamData) {
            data.resetScore()
        }

        setTimer.reset({ restoreBase: true })
        timeTimer.reset({ restoreBase: true })
    }

    const activateLastSet = () => {
        setTimer.setBase(90_000)
        timeTimer.setBase(90_000)

        setTimer.reset()
        timeTimer.reset()
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
            <button class="btn" onclick={startAll}>Start all</button>
            <button class="btn" onclick={pauseAll}>Pause all</button>
            <button class="btn" onclick={resetAll}>Reset all</button>
            <button class="btn" onclick={activateLastSet}>Last set</button>
        </div>
        <LogoChoice teamData={teamData[rightTeamKey()]} />
    </div>
    <div class="flex flex-col gap-12">
        <Timer label="Set" timer={setTimer} />
        <Timer label="Time" timer={timeTimer} />
    </div>
    <Scores />
</div>
