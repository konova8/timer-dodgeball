<script lang="ts">
    import { onMount } from "svelte"
    import type { TimerState } from "./timer.state.svelte"

    type TimerProps = {
        label: string
        timer: TimerState
    }

    const props: TimerProps = $props()

    let containerEl: HTMLDivElement | undefined = $state(undefined)
    let textEl: HTMLParagraphElement | undefined = $state(undefined)
    let fontSize: number = $state(16)

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
        if (!containerEl || !textEl) return

        const containerWidth = containerEl.clientWidth
        const containerHeight = containerEl.clientHeight - 48 // reserve space for buttons

        if (containerWidth === 0 || containerHeight === 0) return

        // Binary search for the largest font size that fits
        let low = 16
        let high = 800
        let best = low

        while (low <= high) {
            const mid = Math.floor((low + high) / 2)
            textEl.style.fontSize = `${mid}px`

            const fits =
                textEl.scrollWidth <= containerWidth &&
                textEl.scrollHeight <= containerHeight

            if (fits) {
                best = mid
                low = mid + 1
            } else {
                high = mid - 1
            }
        }

        fontSize = best
        textEl.style.fontSize = `${best}px`
    }

    onMount(() => {
        const observer = new ResizeObserver(() => {
            computeFontSize()
        })

        if (containerEl) {
            observer.observe(containerEl)
        }

        return () => observer.disconnect()
    })

    $effect(() => {
        // Re-trigger on timer value change (access reactive value)
        void (props.timer.remaining ?? props.timer.base)
        computeFontSize()
    })
</script>

<div class="flex h-full w-full flex-col items-center" bind:this={containerEl}>
    <p
        class="timer-autosize flex flex-1 items-center whitespace-nowrap leading-none"
        bind:this={textEl}
        style="font-size: {fontSize}px;"
    >
        <span class="font-mono" style="font-variant-numeric: tabular-nums;">
            {formatTime(props.timer.remaining ?? props.timer.base)[0]}
        </span>
        <span
            class="font-mono"
            style="font-size: {fontSize *
                0.35}px; font-variant-numeric: tabular-nums;"
        >
            .{formatTime(props.timer.remaining ?? props.timer.base)[1]}
        </span>
    </p>
    <div class="flex shrink-0 items-center justify-center gap-4">
        <button class="btn-start" onclick={props.timer.start}>▶</button>
        <button class="btn-pause" onclick={props.timer.pause}>⏸</button>
        <button class="btn-reset" onclick={() => props.timer.reset()}>
            ⏹
        </button>
    </div>
</div>
