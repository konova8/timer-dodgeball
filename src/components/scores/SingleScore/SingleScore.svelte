<script lang="ts">
    import clsx from "clsx"
    import type { Maybe } from "../../../lib/types"
    import { teamScores } from "../../../state/scores.svelte"
    import { teamLogos, type TeamLogo } from "./single-score.helper"

    type SingleScoreProps = {
        teamLogoName: Maybe<TeamLogo>
        scoreKey: 0 | 1
        invertOrder?: boolean
    }

    let props: SingleScoreProps = $props()

    const noTeamLogo = () => props.teamLogoName === null

    const handleChange = (add: number) => () => {
        teamScores[props.scoreKey].score += add
    }
</script>

<div
    class={clsx("flex w-full items-end gap-4", {
        "justify-end": noTeamLogo(),
        "justify-between": !noTeamLogo(),
        "flex-row-reverse": props.invertOrder,
    })}
>
    {#if props.teamLogoName !== null}
        <img
            src={teamLogos[props.teamLogoName]}
            alt="Team logo"
            class="hidden max-h-40 w-full max-w-40 lg:block"
        />
    {/if}
    <div class="flex flex-col items-center gap-4">
        <p class="text-2xl">
            {teamScores[props.scoreKey].score}
        </p>
        <div class="flex items-center gap-2">
            <button class="btn" onclick={handleChange(1)}>+</button>
            <button class="btn" onclick={handleChange(-1)}>-</button>
        </div>
    </div>
</div>
