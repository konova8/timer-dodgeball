<script lang="ts">
    import clsx from "clsx"
    import { onDestroy, onMount } from "svelte"
    import { appData } from "./app.state.svelte"
    import LogoChoice from "./components/logo-choice/LogoChoice.svelte"
    import { instructionsModal } from "./components/modals/instructions-modal/instructions-modal.state.svelte"
    import InstructionsModal from "./components/modals/instructions-modal/InstructionsModal.svelte"
    import { timeChangeModal } from "./components/modals/time-change-modal/time-change-modal.state.svelte"
    import TimeChangeModal from "./components/modals/time-change-modal/TimeChangeModal.svelte"
    import { isTeamLogo } from "./components/scores/scores.helper"
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
    import { loadState, saveState } from "./lib/persistence"

    const abortController = new AbortController()

    let menuOpen = $state(false)
    let pressing = $state(false)

    const isAnyModalOpen = () =>
        timeChangeModal.isOpen() || instructionsModal.isOpen()

    const anyTimerRunning = () => setTimer.isRunning() || timeTimer.isRunning()

    // Restore state from localStorage
    const persisted = loadState()
    if (persisted) {
        setTimer.setBase(persisted.setTimerBase)
        setTimer.setRemaining(persisted.setTimerRemaining)
        timeTimer.setBase(persisted.timeTimerBase)
        timeTimer.setRemaining(persisted.timeTimerRemaining)

        if (persisted.team0Logo && isTeamLogo(persisted.team0Logo)) {
            teamData[0].setLogo(persisted.team0Logo)
        }
        if (persisted.team1Logo && isTeamLogo(persisted.team1Logo)) {
            teamData[1].setLogo(persisted.team1Logo)
        }
        teamData[0].setScore(persisted.team0Score)
        teamData[1].setScore(persisted.team1Score)
        teamSwap.active = persisted.teamSwapActive
        appData.setShowPoints(persisted.showPoints)
        appData.setScoresZoom(persisted.scoresZoom)
        appData.setLogoZoom(persisted.logoZoom)
        if (persisted.darkTheme !== undefined) {
            appData.setDarkTheme(persisted.darkTheme)
        }
        if (persisted.showDecimals !== undefined) {
            appData.setShowDecimals(persisted.showDecimals)
        }

        // Restart timers if they were running before reload
        if (persisted.setTimerRunning) setTimer.start()
        if (persisted.timeTimerRunning) timeTimer.start()
    }

    // Auto-save state periodically (every 2s) and on meaningful changes
    let latestState: ReturnType<typeof buildState> | null = null

    const buildState = () => ({
        setTimerBase: setTimer.base,
        setTimerRemaining: setTimer.remaining,
        setTimerRunning: setTimer.running,
        timeTimerBase: timeTimer.base,
        timeTimerRemaining: timeTimer.remaining,
        timeTimerRunning: timeTimer.running,
        team0Logo: teamData[0].logo,
        team1Logo: teamData[1].logo,
        team0Score: teamData[0].score,
        team1Score: teamData[1].score,
        teamSwapActive: teamSwap.active,
        showPoints: appData.showPoints,
        scoresZoom: appData.scoresZoom,
        logoZoom: appData.logoZoom,
        darkTheme: appData.darkTheme,
        showDecimals: appData.showDecimals,
        instructionsSeen: true,
    })

    $effect(() => {
        // Track all reactive state — this re-runs when anything changes
        latestState = buildState()
    })

    // Save to localStorage every 2 seconds
    const saveInterval = setInterval(() => {
        if (latestState) saveState(latestState)
    }, 2000)

    // Also save immediately before page unload
    window.addEventListener("beforeunload", () => {
        if (latestState) saveState(latestState)
    })

    const handleSpaceAction = () => {
        if (isAnyModalOpen()) {
            return
        }

        const bothRunning = setTimer.isRunning() && timeTimer.isRunning()

        if (bothRunning) {
            pauseAll()
        } else if (timeTimer.isRunning() && !setTimer.isRunning()) {
            // Time timer is running, only start set timer
            setTimer.start()
        } else {
            startAll()
        }
    }

    onMount(() => {
        // Prevent spacebar from scrolling + show press feedback
        document.addEventListener(
            "keydown",
            e => {
                if (e.key === " ") {
                    e.preventDefault()
                    if (!e.repeat && !isAnyModalOpen()) pressing = true
                }
            },
            { signal: abortController.signal },
        )

        onKeyUp(
            " ",
            () => {
                pressing = false
                handleSpaceAction()
            },
            abortController.signal,
        )

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

        // Touch support for smartphone (touchstart = press feedback, touchend = action)
        document.addEventListener(
            "touchstart",
            (e: TouchEvent) => {
                if (isAnyModalOpen()) return
                const target = e.target as HTMLElement
                if (
                    target.closest(
                        "button, input, select, textarea, a, [role='button']",
                    )
                ) {
                    return
                }
                pressing = true
            },
            { signal: abortController.signal },
        )

        document.addEventListener(
            "touchend",
            (e: TouchEvent) => {
                if (!pressing) return
                pressing = false

                if (isAnyModalOpen()) return

                const target = e.target as HTMLElement
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

        document.addEventListener(
            "touchcancel",
            () => {
                pressing = false
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
        clearInterval(saveInterval)
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
        appData.setScoresZoom(100)
        appData.setLogoZoom(100)
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
        "flex h-[100dvh] w-[100dvw] select-none flex-col-reverse items-center justify-between p-4 transition-colors lg:flex-col lg:p-12",
        {
            "bg-yellow-600 text-white": pressing && !appData.redBackground,
            "bg-red-800 text-white": appData.redBackground && !pressing,
            "bg-black text-white":
                !appData.redBackground && !pressing && appData.darkTheme,
            "bg-white text-black":
                !appData.redBackground && !pressing && !appData.darkTheme,
        },
    )}
>
    <div class="relative z-20 flex w-full items-start justify-between gap-8">
        <LogoChoice teamData={teamData[leftTeamKey()]} />
        <div
            class="flex w-full items-center justify-center gap-4 whitespace-nowrap"
        >
            {#if anyTimerRunning()}
                <button class="btn-pause" onclick={pauseAll}>⏸ All</button>
            {:else}
                <button class="btn-start" onclick={startAll}>▶ All</button>
            {/if}
            <button class="btn-reset" onclick={resetTimers}>⏹ All</button>
            <button class="btn" onclick={activateLastSet}>Last set</button>
            <div class="menu-container relative">
                <button class="btn" onclick={toggleMenu}>More ▾</button>
                {#if menuOpen}
                    <div
                        class="absolute right-0 top-full z-40 mt-2 flex w-48 flex-col gap-2 rounded-lg border border-gray-600 bg-gray-800 p-3 shadow-xl lg:top-full lg:mt-2"
                    >
                        <button class="btn" onclick={teamSwap.toggle}>
                            Swap teams
                        </button>
                        <button class="btn" onclick={openTimeChangeModal}>
                            Change times
                        </button>
                        <button class="btn" onclick={appData.togglePoints}>
                            {appData.showPoints ? "Hide points" : "Show points"}
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
                        <button class="btn" onclick={appData.toggleDecimals}>
                            {appData.showDecimals
                                ? "Hide decimals"
                                : "Show decimals"}
                        </button>
                        <button class="btn" onclick={appData.toggleTheme}>
                            {appData.darkTheme ? "Light theme" : "Dark theme"}
                        </button>
                        <button class="btn" onclick={instructionsModal.open}>
                            Instructions
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
        class="relative z-10 flex w-full flex-1 flex-col items-center justify-center overflow-hidden"
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
