<script lang="ts">
    import clsx from "clsx"
    import { TeamData } from "../scores.state.svelte"

    type SingleScoreProps = {
        teamData: TeamData
        position: "left" | "right"
    }

    const props: SingleScoreProps = $props()
</script>

<div
    class={clsx("flex items-end", {
        "flex-row-reverse": props.position === "right",
    })}
>
    <div class="flex flex-col items-center gap-4">
        <p
            class="text-8xl md:text-[8rem] lg:text-[12rem] xl:max-2xl:text-[13rem]"
        >
            {props.teamData.score}
        </p>
        <div class="flex items-center gap-2">
            <button class="btn" onclick={props.teamData.changeScore(1)}>
                +
            </button>
            <button class="btn" onclick={props.teamData.changeScore(-1)}>
                -
            </button>
        </div>
    </div>
</div>
