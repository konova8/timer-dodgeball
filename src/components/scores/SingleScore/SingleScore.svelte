<script lang="ts">
    import clsx from "clsx"
    import { teamLogoData } from "../scores.helper"
    import { TeamData } from "../scores.state.svelte"

    type SingleScoreProps = {
        teamData: TeamData
        position: "left" | "right"
    }

    const props: SingleScoreProps = $props()

    const teamLogoPath = $derived.by(() => {
        if (props.teamData.logo === null) {
            return null
        }

        return teamLogoData[props.teamData.logo].imagePath
    })
    const noTeamLogo = $derived(teamLogoPath === null)
</script>

<div
    class={clsx("flex w-full items-end gap-4", {
        "lg:justify-end": noTeamLogo,
        "lg:justify-between": !noTeamLogo,
        "flex-row-reverse": props.position === "right",
    })}
>
    {#if teamLogoPath}
        <img
            src={teamLogoPath}
            alt="Team logo"
            class="hidden max-h-40 w-full max-w-40 lg:block"
        />
    {:else}
        <div class="hidden h-40 max-h-40 w-full max-w-40 lg:block"></div>
    {/if}
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
