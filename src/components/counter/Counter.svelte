<script lang="ts">
    let count: number = $state(0)
    const increment = () => (count += 1)
</script>

<button
    onclick={increment}
    class="rounded-lg border-2 border-white bg-green-800 px-4 py-2"
>
    Count is {count}
</button>
