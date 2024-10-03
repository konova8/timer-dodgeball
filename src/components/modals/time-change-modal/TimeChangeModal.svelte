<script lang="ts">
    import { onDestroy, onMount } from "svelte"
    import { isErr } from "../../../lib/algebraic"
    import { onClickOut } from "../../../lib/events/on-click-out"
    import { onKeyDown } from "../../../lib/events/on-key-down"
    import type { Maybe } from "../../../lib/types"
    import { setTimer, timeTimer } from "../../timer/timer.state.svelte"
    import { fromTimeString, toTimeString } from "./time-change-modal.helper"
    import { timeChangeModal } from "./time-change-modal.state.svelte"

    let modalEl: Maybe<HTMLDivElement> = $state(null)
    let setTimerInputEl: Maybe<HTMLInputElement> = $state(null)
    let timeTimerInputEl: Maybe<HTMLInputElement> = $state(null)

    const abortController = new AbortController()

    let setTimerInput = $state(toTimeString(setTimer.base))
    let timeTimerInput = $state(toTimeString(timeTimer.base))

    onMount(() => {
        onKeyDown(
            "Escape",
            () => timeChangeModal.close(),
            abortController.signal,
        )
        onClickOut(
            () => modalEl,
            () => timeChangeModal.close(),
            abortController.signal,
        )
    })

    onDestroy(() => {
        abortController.abort()
    })

    const onSubmit = (timerType: "set" | "time") => (e: SubmitEvent) => {
        e.preventDefault()

        const input = timerType === "set" ? setTimerInput : timeTimerInput
        const timer = timerType === "set" ? setTimer : timeTimer

        const newBase = fromTimeString(input)
        if (isErr(newBase)) {
            alert(`Could not change time: ${newBase.error}`)
            return
        }

        timer.setBase(newBase.data)
    }
</script>

<div
    class="fixed inset-0 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black bg-opacity-50 text-white"
>
    <div
        bind:this={modalEl}
        class="flex max-w-[90%] flex-col gap-8 rounded-lg border border-solid border-white bg-blue-800 p-8 text-2xl lg:gap-4"
    >
        <p class="pb-4 text-lg">Format MM:SS</p>
        <form
            onsubmit={onSubmit("set")}
            class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-center"
        >
            <p class="pr-4">Set</p>
            <input
                bind:this={setTimerInputEl}
                bind:value={setTimerInput}
                type="text"
                class="w-full rounded-lg p-2 text-black"
            />
            <button class="btn">Change</button>
        </form>
        <form
            onsubmit={onSubmit("time")}
            class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-center"
        >
            <p>Time</p>
            <input
                bind:this={timeTimerInputEl}
                bind:value={timeTimerInput}
                type="text"
                class="w-full rounded-lg p-2 text-black"
            />
            <button class="btn">Change</button>
        </form>
    </div>
</div>
