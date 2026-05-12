<script lang="ts">
    import { instructionsModal } from "./instructions-modal.state.svelte"
</script>

<div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
>
    <div
        class="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-xl bg-gray-900 p-6 text-white shadow-2xl"
    >
        <h2 class="mb-4 text-center text-2xl font-bold">
            Timer Dodgeball — Istruzioni
        </h2>

        <div class="space-y-5 text-sm">
            <section>
                <h3 class="mb-2 text-lg font-semibold text-blue-400">
                    ⏱️ Controllo Timer
                </h3>
                <ul class="list-inside list-disc space-y-1 text-gray-300">
                    <li>
                        <kbd class="rounded bg-gray-700 px-1">Spazio</kbd> /
                        <span class="text-yellow-300">Tocca lo schermo</span>
                        — Avvia o ferma i timer
                    </li>
                    <li>
                        Lo sfondo diventa
                        <span class="font-bold text-yellow-400">giallo</span>
                        mentre tieni premuto (feedback visivo)
                    </li>
                    <li>
                        <kbd class="rounded bg-gray-700 px-1">S</kbd> — Avvia/ferma
                        solo il timer Set
                    </li>
                    <li>
                        <kbd class="rounded bg-gray-700 px-1">T</kbd> — Avvia/ferma
                        solo il timer Time
                    </li>
                    <li>
                        Usa i bottoni
                        <span class="text-blue-300">+1m, -1m, +1s, -1s</span>
                        sotto ogni timer per modificare il tempo (solo a timer fermo)
                    </li>
                </ul>
            </section>

            <section>
                <h3 class="mb-2 text-lg font-semibold text-green-400">
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
                    <li>
                        Usa i bottoni <span class="text-blue-300">+</span> e
                        <span class="text-blue-300">-</span> sotto i punteggi
                    </li>
                </ul>
            </section>

            <section>
                <h3 class="mb-2 text-lg font-semibold text-purple-400">
                    📱 Uso da smartphone
                </h3>
                <ul class="list-inside list-disc space-y-1 text-gray-300">
                    <li>
                        Tocca ovunque sullo schermo per avviare/fermare (come
                        spazio)
                    </li>
                    <li>I tocchi sui bottoni funzionano normalmente</li>
                    <li>
                        Il menu
                        <span class="text-blue-300">More ▾</span> contiene tutte
                        le opzioni avanzate
                    </li>
                </ul>
            </section>

            <section>
                <h3 class="mb-2 text-lg font-semibold text-orange-400">
                    ⚙️ Opzioni (menu More)
                </h3>
                <ul class="list-inside list-disc space-y-1 text-gray-300">
                    <li>Swap teams — scambia lato squadre</li>
                    <li>Change times — modifica durata timer</li>
                    <li>Show/Hide points — mostra/nascondi punteggi</li>
                    <li>Scores/Logo zoom — ingrandisci numeri o loghi</li>
                    <li>Show/Hide decimals — centesimi di secondo</li>
                    <li>Dark/Light theme — sfondo nero o bianco</li>
                    <li>Full reset — azzera tutto</li>
                </ul>
            </section>

            <section>
                <h3 class="mb-2 text-lg font-semibold text-red-400">
                    💾 Salvataggio
                </h3>
                <p class="text-gray-300">
                    Tutto viene salvato automaticamente. Se ricarichi la pagina
                    per sbaglio, timer e punteggi riprendono da dove erano.
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
