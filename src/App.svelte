<script lang="ts">
    import { onDestroy, onMount } from "svelte"
    import LogoChoice from "./components/logo-choice/LogoChoice.svelte"
    import { timeChangeModal } from "./components/modals/time-change-modal/time-change-modal.state.svelte"
    import TimeChangeModal from "./components/modals/time-change-modal/TimeChangeModal.svelte"
    import {
        leftTeamKey,
        rightTeamKey,
        teamData,
    } from "./components/scores/scores.state.svelte"
    import Scores from "./components/scores/Scores.svelte"
    import {
        setTimer,
        TimerState,
        timeTimer,
    } from "./components/timer/timer.state.svelte"
    import Timer from "./components/timer/Timer.svelte"
    import { onKeyDown } from "./lib/events/on-key-down"
    import clsx from "clsx"
    import { appData } from "./app.state.svelte"

    const abortController = new AbortController()

    onMount(() => {
        onKeyDown(
            ["p", " "],
            () => {
                if (timeChangeModal.isOpen()) {
                    return
                }

                if (setTimer.pendingResume() || timeTimer.pendingResume()) {
                    startAll()
                } else {
                    pauseAll()
                }
            },
            abortController.signal,
        )

        const timerToggleCallback = (timer: TimerState) => () => {
            if (timer.pendingResume()) {
                timer.start()
            } else {
                timer.pause()
            }
        }

        onKeyDown("s", timerToggleCallback(setTimer), abortController.signal)
        onKeyDown("t", timerToggleCallback(timeTimer), abortController.signal)
    })

    onDestroy(() => {
        abortController.abort()
    })

    const startAll = () => {
        setTimer.start()
        timeTimer.start()
    }

    const pauseAll = () => {
        setTimer.pause()
        timeTimer.pause()
    }

    const resetTimers = () => {
        setTimer.reset({ restoreBase: true })
        timeTimer.reset({ restoreBase: true })
    }

    const fullReset = () => {
        for (const data of teamData) {
            data.resetScore()
        }

        resetTimers()
    }

    const activateLastSet = () => {
        setTimer.setBase(90_000)
        timeTimer.setBase(90_000)

        setTimer.reset()
        timeTimer.reset()
    }

    const openTimeChangeModal = (e: MouseEvent) => {
        e.preventDefault()

        timeChangeModal.open()
    }
</script>

<div
    class={clsx(
        "flex h-[100dvh] w-[100dvw] flex-col-reverse items-center justify-between bg-white p-4 text-black transition-colors lg:flex-col lg:p-12",
        {
            "bg-gray-950": !appData.redBackground,
            "bg-red-800": appData.redBackground,
        },
    )}
>
    <div class="flex w-full items-start justify-between gap-8">
        <LogoChoice teamData={teamData[leftTeamKey()]} />
        <div
            class="grid w-full grid-cols-2 grid-rows-2 items-center justify-center gap-4 lg:flex lg:flex-wrap"
        >
            <button class="btn-start" onclick={startAll}>Start all</button>
            <button class="btn-pause" onclick={pauseAll}>Pause all</button>
            <button class="btn-reset" onclick={resetTimers}>Reset all</button>
            <button class="btn-full-reset" onclick={fullReset}>
                Full reset
            </button>
            <button class="btn" onclick={activateLastSet}>Last set</button>
            <button class="btn" onclick={openTimeChangeModal}>
                Change times
            </button>
        </div>
        <LogoChoice teamData={teamData[rightTeamKey()]} />
    </div>
    <div class="flex flex-row justify-around sm:max-2xl:flex-col">
        <Timer label="Set" timer={setTimer} />
        <div class="h-[1px] w-64 rounded-lg bg-white bg-opacity-90"></div>
        <Timer label="Time" timer={timeTimer} />
    </div>
    <Scores />
</div>
{#if timeChangeModal.isOpen()}
    <TimeChangeModal />
{/if}
