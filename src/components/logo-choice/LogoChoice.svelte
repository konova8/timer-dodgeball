<script lang="ts">
    import type { Maybe, Svelte } from "../../lib/types"
    import {
        isTeamLogo,
        teamLogoData,
        teamLogos,
    } from "../scores/scores.helper"
    import type { TeamData } from "../scores/scores.state.svelte"

    type LogoChoiceProps = {
        teamData: TeamData
    }

    const placeholderValue: string = "placeholder-value"

    let selectEl: Maybe<HTMLSelectElement>
    let props: LogoChoiceProps = $props()

    const handleChange = (e: Svelte.ChangeEvent.Select) => {
        const logo = e.currentTarget.value

        if (!isTeamLogo(logo)) {
            console.error(`passed key is not a teamLogos key: ${logo}`)
            return
        }

        props.teamData.setLogo(logo)
    }

    $effect(() => {
        if (!selectEl) {
            return
        }

        selectEl.value = props.teamData.logo ?? placeholderValue
    })
</script>

<select
    bind:this={selectEl}
    onchange={handleChange}
    class="btn hidden rounded-lg lg:block"
>
    <option selected={true} disabled={true} value={placeholderValue}>
        Choose logo
    </option>
    {#each teamLogos as key}
        <option value={key}>
            {teamLogoData[key].logoName}
        </option>
    {/each}
</select>
