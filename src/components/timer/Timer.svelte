<script lang="ts">
    import type { TimerState } from "./timer.state.svelte"

    type TimerProps = {
        label: string
        timer: TimerState
    }

    const props: TimerProps = $props()

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
</script>

<div class="flex flex-col items-center">
    <p class="timer-display leading-none">
        <span class="timer-main">
            {formatTime(props.timer.remaining ?? props.timer.base)[0]}
        </span>
        <span class="timer-ms">
            .{formatTime(props.timer.remaining ?? props.timer.base)[1]}
        </span>
    </p>
    <div class="flex items-center justify-center gap-4">
        <button class="btn-start" onclick={props.timer.start}>▶</button>
        <button class="btn-pause" onclick={props.timer.pause}>⏸</button>
        <button class="btn-reset" onclick={() => props.timer.reset()}>
            ⏹
        </button>
    </div>
</div>
