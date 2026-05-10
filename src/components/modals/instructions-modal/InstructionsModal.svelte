<script lang="ts">
    import { instructionsModal } from "./instructions-modal.state.svelte"
</script>

<div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
>
    <div
        class="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-xl bg-gray-900 p-6 text-white shadow-2xl"
    >
        <h2 class="mb-4 text-center text-2xl font-bold">
            Timer Dodgeball — Istruzioni
        </h2>

        <div class="space-y-4 text-sm">
            <section>
                <h3 class="mb-1 text-lg font-semibold text-blue-400">
                    ⏱️ Timer
                </h3>
                <ul class="list-inside list-disc space-y-1 text-gray-300">
                    <li>
                        <kbd class="rounded bg-gray-700 px-1">Spazio</kbd> /
                        <span class="text-yellow-300">Touch</span>
                        — Avvia il timer Set (o ferma entrambi se sono entrambi attivi)
                    </li>
                    <li>
                        <kbd class="rounded bg-gray-700 px-1">S</kbd> — Toggle timer
                        Set
                    </li>
                    <li>
                        <kbd class="rounded bg-gray-700 px-1">T</kbd> — Toggle timer
                        Time
                    </li>
                </ul>
            </section>

            <section>
                <h3 class="mb-1 text-lg font-semibold text-green-400">
                    🏆 Punteggio
                </h3>
                <ul class="list-inside list-disc space-y-1 text-gray-300">
                    <li>
                        <kbd class="rounded bg-gray-700 px-1">←</kbd> — +1 squadra
                        sinistra
                    </li>
                    <li>
                        <kbd class="rounded bg-gray-700 px-1">→</kbd> — +1 squadra
                        destra
                    </li>
                </ul>
            </section>

            <section>
                <h3 class="mb-1 text-lg font-semibold text-purple-400">
                    📱 Smartphone
                </h3>
                <p class="text-gray-300">
                    Tocca ovunque sullo schermo per avviare/fermare il timer
                    (come la barra spaziatrice).
                </p>
            </section>
        </div>

        <button
            class="btn mt-6 w-full py-3 text-lg"
            onclick={instructionsModal.close}
        >
            Ho capito!
        </button>
    </div>
</div>
