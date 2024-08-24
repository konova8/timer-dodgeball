<script lang="ts">
    import SingleScore from "./SingleScore/SingleScore.svelte"

    let isSwapped = $state(false)
</script>

<div class="flex w-full justify-between gap-4 lg:gap-48">
    <SingleScore scoreKey={isSwapped ? 1 : 0} teamLogoName={"goblins"} />
    <div class="flex items-end">
        <button class="btn" onclick={() => (isSwapped = !isSwapped)}>
            Swap
        </button>
    </div>
    <SingleScore
        scoreKey={isSwapped ? 0 : 1}
        teamLogoName={"oragiobat"}
        invertOrder={true}
    />
</div>
