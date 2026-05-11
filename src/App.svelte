<script lang="ts">
    import clsx from "clsx"
    import { onDestroy, onMount } from "svelte"
    import { appData } from "./app.state.svelte"
    import LogoChoice from "./components/logo-choice/LogoChoice.svelte"
    import { instructionsModal } from "./components/modals/instructions-modal/instructions-modal.state.svelte"
    import InstructionsModal from "./components/modals/instructions-modal/InstructionsModal.svelte"
    import { timeChangeModal } from "./components/modals/time-change-modal/time-change-modal.state.svelte"
    import TimeChangeModal from "./components/modals/time-change-modal/TimeChangeModal.svelte"
    import {
        leftTeamKey,
        rightTeamKey,
        teamData,
        teamSwap,
    } from "./components/scores/scores.state.svelte"
    import Scores from "./components/scores/Scores.svelte"
    import {
        setTimer,
        TimerState,
        timeTimer,
    } from "./components/timer/timer.state.svelte"
    import Timer from "./components/timer/Timer.svelte"
    import { onKeyUp } from "./lib/events/on-key-up"

    const abortController = new AbortController()

    let menuOpen = $state(false)

    const isAnyModalOpen = () =>
        timeChangeModal.isOpen() || instructionsModal.isOpen()

    const handleSpaceAction = () => {
        if (isAnyModalOpen()) {
            return
        }

        const bothRunning =
            !setTimer.pendingResume() && !timeTimer.pendingResume()

        if (bothRunning) {
            pauseAll()
        } else if (!timeTimer.pendingResume() && setTimer.pendingResume()) {
            // Time timer is running, only start set timer
            setTimer.start()
        } else {
            startAll()
        }
    }

    onMount(() => {
        // Prevent spacebar from scrolling
        document.addEventListener(
            "keydown",
            e => {
                if (e.key === " ") {
                    e.preventDefault()
                }
            },
            { signal: abortController.signal },
        )

        onKeyUp(" ", handleSpaceAction, abortController.signal)

        const timerToggleCallback = (timer: TimerState) => () => {
            if (isAnyModalOpen()) return
            if (timer.pendingResume()) {
                timer.start()
            } else {
                timer.pause()
            }
        }

        onKeyUp("s", timerToggleCallback(setTimer), abortController.signal)
        onKeyUp("t", timerToggleCallback(timeTimer), abortController.signal)

        onKeyUp(
            "ArrowLeft",
            () => {
                if (isAnyModalOpen()) return
                teamData[leftTeamKey()].changeScore(1)()
            },
            abortController.signal,
        )

        onKeyUp(
            "ArrowRight",
            () => {
                if (isAnyModalOpen()) return
                teamData[rightTeamKey()].changeScore(1)()
            },
            abortController.signal,
        )

        // Touch support for smartphone (touchend = release)
        document.addEventListener(
            "touchend",
            (e: TouchEvent) => {
                if (isAnyModalOpen()) return

                const target = e.target as HTMLElement
                // Ignore touches on buttons, inputs, and interactive elements
                if (
                    target.closest(
                        "button, input, select, textarea, a, [role='button']",
                    )
                ) {
                    return
                }

                e.preventDefault()
                handleSpaceAction()
            },
            { signal: abortController.signal },
        )

        // Close menu on click outside
        document.addEventListener(
            "click",
            (e: MouseEvent) => {
                const target = e.target as HTMLElement
                if (!target.closest(".menu-container")) {
                    menuOpen = false
                }
            },
            { signal: abortController.signal },
        )
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

    const toggleMenu = () => {
        menuOpen = !menuOpen
    }
</script>

<div
    class={clsx(
        "flex h-[100dvh] w-[100dvw] select-none flex-col-reverse items-center justify-between bg-white p-4 text-black transition-colors lg:flex-col lg:p-12",
        {
            "bg-gray-950": !appData.redBackground,
            "bg-red-800": appData.redBackground,
        },
    )}
>
    <div class="relative z-20 flex w-full items-start justify-between gap-8">
        <LogoChoice teamData={teamData[leftTeamKey()]} />
        <!-- Mobile: grid layout -->
        <div
            class="grid w-full grid-cols-2 grid-rows-2 items-center justify-center gap-4 lg:hidden"
        >
            <button class="btn-start" onclick={startAll}>▶ All</button>
            <button class="btn-pause" onclick={pauseAll}>⏸ All</button>
            <button class="btn-reset" onclick={resetTimers}>⏹ All</button>
            <button class="btn" onclick={teamSwap.toggle}>Swap teams</button>
            <button class="btn" onclick={activateLastSet}>Last set</button>
            <button class="btn" onclick={openTimeChangeModal}>
                Change times
            </button>
            <button class="btn" onclick={appData.togglePoints}>
                {appData.showPoints ? "Hide points" : "Show points"}
            </button>
        </div>
        <!-- Desktop: single row with menu -->
        <div
            class="hidden w-full items-center justify-center gap-4 whitespace-nowrap lg:flex"
        >
            <button class="btn-start" onclick={startAll}>▶ All</button>
            <button class="btn-pause" onclick={pauseAll}>⏸ All</button>
            <button class="btn-reset" onclick={resetTimers}>⏹ All</button>
            <button class="btn" onclick={appData.togglePoints}>
                {appData.showPoints ? "Hide points" : "Show points"}
            </button>
            <div class="menu-container relative">
                <button class="btn" onclick={toggleMenu}>More ▾</button>
                {#if menuOpen}
                    <div
                        class="absolute right-0 top-full z-40 mt-2 flex min-w-48 flex-col gap-2 rounded-lg border border-gray-600 bg-gray-800 p-3 shadow-xl"
                    >
                        <button class="btn" onclick={teamSwap.toggle}>
                            Swap teams
                        </button>
                        <button class="btn" onclick={activateLastSet}>
                            Last set
                        </button>
                        <button class="btn" onclick={openTimeChangeModal}>
                            Change times
                        </button>
                        <button class="btn" onclick={appData.scoresZoomIn}>
                            Scores zoom +
                        </button>
                        <button class="btn" onclick={appData.scoresZoomOut}>
                            Scores zoom -
                        </button>
                        <button class="btn" onclick={appData.logoZoomIn}>
                            Logo zoom +
                        </button>
                        <button class="btn" onclick={appData.logoZoomOut}>
                            Logo zoom -
                        </button>
                        <button class="btn-full-reset" onclick={fullReset}>
                            Full reset
                        </button>
                    </div>
                {/if}
            </div>
        </div>
        <LogoChoice teamData={teamData[rightTeamKey()]} />
    </div>
    <div
        class="relative z-10 flex w-full flex-1 flex-col items-center overflow-hidden"
    >
        {#if (timeTimer.remaining ?? timeTimer.base) > (setTimer.remaining ?? setTimer.base) + 50}
            <Timer timer={setTimer} />
        {/if}
        <Timer timer={timeTimer} />
    </div>
    {#if appData.showPoints}
        <Scores />
    {/if}
</div>
{#if timeChangeModal.isOpen()}
    <TimeChangeModal />
{/if}
{#if instructionsModal.isOpen()}
    <InstructionsModal />
{/if}
