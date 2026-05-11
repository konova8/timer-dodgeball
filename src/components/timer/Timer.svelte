<script lang="ts">
    import { onMount } from "svelte"
    import { appData } from "../../app.state.svelte"
    import type { TimerState } from "./timer.state.svelte"

    type TimerProps = {
        timer: TimerState
    }

    const props: TimerProps = $props()

    let containerEl: HTMLDivElement | undefined = $state(undefined)
    let mainSpan: HTMLSpanElement | undefined = $state(undefined)
    let msSpan: HTMLSpanElement | undefined = $state(undefined)
    let fontSize: number = $state(64)

    const formatTime = (timeMs: number) => {
        const minutes = Math.floor(timeMs / 1000 / 60)
        const minutesMs = minutes * 1000 * 60
        const timeWithoutMinutes = timeMs - minutesMs

        const seconds = Math.floor(timeWithoutMinutes / 1000)
        const secondsMs = seconds * 1000
        const timeWithoutMinutesAndSeconds = timeWithoutMinutes - secondsMs

        const ms = Math.floor(timeWithoutMinutesAndSeconds / 10)

        return [
            `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
            `${ms.toString().padStart(2, "0")}`,
        ]
    }

    const computeFontSize = () => {
        if (!containerEl || !mainSpan) return

        const availableWidth = containerEl.clientWidth - 4
        const availableHeight = containerEl.clientHeight - 48

        if (availableWidth <= 0 || availableHeight <= 0) return

        let low = 16
        let high = 600
        let best = low

        while (low <= high) {
            const mid = Math.floor((low + high) / 2)
            mainSpan.style.fontSize = `${mid}px`
            if (msSpan) msSpan.style.fontSize = `${Math.floor(mid * 0.35)}px`

            const textWidth = mainSpan.offsetWidth + (msSpan?.offsetWidth ?? 0)
            const textHeight = mainSpan.offsetHeight

            if (textWidth <= availableWidth && textHeight <= availableHeight) {
                best = mid
                low = mid + 1
            } else {
                high = mid - 1
            }
        }

        fontSize = best
    }

    onMount(() => {
        const observer = new ResizeObserver(() => {
            computeFontSize()
        })

        if (containerEl) {
            observer.observe(containerEl)
            computeFontSize()
        }

        // Recalculate after fonts are loaded (Orbitron has different glyph widths)
        document.fonts.ready.then(() => computeFontSize())

        return () => observer.disconnect()
    })

    $effect(() => {
        void (props.timer.remaining ?? props.timer.base)
        void appData.showDecimals
        computeFontSize()
    })
</script>

<div
    class="flex w-full flex-1 flex-col items-center justify-center"
    bind:this={containerEl}
>
    <div class="flex items-baseline whitespace-nowrap leading-none">
        <span
            bind:this={mainSpan}
            class="font-timer"
            style="font-size: {fontSize}px; font-variant-numeric: tabular-nums;"
        >
            {formatTime(props.timer.remaining ?? props.timer.base)[0]}
        </span>
        {#if appData.showDecimals}
            <span
                bind:this={msSpan}
                class="font-timer"
                style="font-size: {Math.floor(
                    fontSize * 0.35,
                )}px; font-variant-numeric: tabular-nums;"
            >
                .{formatTime(props.timer.remaining ?? props.timer.base)[1]}
            </span>
        {/if}
    </div>
    <div class="flex shrink-0 items-center justify-center gap-2">
        <button
            class="btn"
            onclick={() => props.timer.adjustTime(60_000)}
            disabled={props.timer.isRunning()}
        >
            +1m
        </button>
        <button
            class="btn"
            onclick={() => props.timer.adjustTime(-60_000)}
            disabled={props.timer.isRunning()}
        >
            -1m
        </button>
        <button
            class="btn"
            onclick={() => props.timer.adjustTime(1_000)}
            disabled={props.timer.isRunning()}
        >
            +1s
        </button>
        <button
            class="btn"
            onclick={() => props.timer.adjustTime(-1_000)}
            disabled={props.timer.isRunning()}
        >
            -1s
        </button>
        {#if props.timer.isRunning()}
            <button class="btn-pause" onclick={props.timer.pause}>⏸</button>
        {:else}
            <button class="btn-start" onclick={props.timer.start}>▶</button>
        {/if}
        <button class="btn-reset" onclick={() => props.timer.reset()}>
            ⏹
        </button>
    </div>
</div>
