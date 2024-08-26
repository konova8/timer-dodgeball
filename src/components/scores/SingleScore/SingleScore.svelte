<script lang="ts">
    import clsx from "clsx"
    import { teamLogos } from "../scores.helper"
    import { TeamData } from "../scores.state.svelte"

    type SingleScoreProps = {
        teamData: TeamData
        invertOrder?: boolean
    }

    let props: SingleScoreProps = $props()

    const noTeamLogo = $derived(props.teamData.logo === null)
</script>

<div
    class={clsx("flex w-full items-end gap-4", {
        "justify-end": noTeamLogo,
        "justify-between": !noTeamLogo,
        "flex-row-reverse": props.invertOrder,
    })}
>
    {#if props.teamData.logo !== null}
        <img
            src={teamLogos[props.teamData.logo]}
            alt="Team logo"
            class="hidden max-h-40 w-full max-w-40 lg:block"
        />
    {/if}
    <div class="flex flex-col items-center gap-4">
        <p class="text-2xl">
            {props.teamData.score}
        </p>
        <div class="flex items-center gap-2">
            <button class="btn" onclick={props.teamData.changeScore(1)}
                >+</button
            >
            <button class="btn" onclick={props.teamData.changeScore(-1)}
                >-</button
            >
        </div>
    </div>
</div>
