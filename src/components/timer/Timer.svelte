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

        const ms = Math.floor(timeWithoutMinutesAndSeconds)

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${ms.toString().padStart(3, "0")}`
    }
</script>

<div class="flex flex-col items-center gap-4">
    <p class="text-3xl">{props.label}</p>
    <p class="text-[4rem]">
        {formatTime(props.timer.remaining ?? props.timer.base)}
    </p>
    <div class="flex items-center justify-center gap-4">
        <button class="btn-start" onclick={props.timer.start}>Start</button>
        <button class="btn-pause" onclick={props.timer.pause}>Pause</button>
        <button class="btn-reset" onclick={() => props.timer.reset()}>
            Reset
        </button>
    </div>
</div>
