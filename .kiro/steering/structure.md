# Project Structure

```
src/
├── main.ts                  # Entry point
├── App.svelte               # Root component (layout, toolbar, shortcut, persistenza)
├── app.css                  # Stili globali Tailwind + classi btn
├── app.state.svelte.ts      # Stato globale (showPoints, scoresZoom, logoZoom, darkTheme, showDecimals)
├── components/
│   ├── timer/               # Timer countdown
│   │   ├── Timer.svelte           # Display timer con auto-sizing font + bottoni controllo
│   │   ├── timer.state.svelte.ts  # Classe TimerState (countdown, start/pause/reset/adjustTime)
│   │   └── timer.helper.ts        # Side effects (suono allarme, flash rosso)
│   ├── scores/              # Punteggio squadre
│   │   ├── Scores.svelte          # Layout punteggi + loghi (zoom indipendenti)
│   │   ├── SingleScore/SingleScore.svelte  # Singolo punteggio con bottoni +/-
│   │   ├── scores.state.svelte.ts # Classi TeamData, TeamSwap
│   │   └── scores.helper.ts       # Catalogo loghi squadre
│   ├── logo-choice/         # Selettore logo squadra (dropdown)
│   │   └── LogoChoice.svelte
│   └── modals/
│       ├── instructions-modal/      # Modale istruzioni (solo prima visita)
│       │   ├── InstructionsModal.svelte
│       │   └── instructions-modal.state.svelte.ts
│       └── time-change-modal/       # Modale modifica tempi (formato MM:SS)
│           ├── TimeChangeModal.svelte
│           ├── time-change-modal.state.svelte.ts
│           └── time-change-modal.helper.ts
├── lib/                     # Utility condivise
│   ├── types.ts             # Tipi generici (Maybe<T>)
│   ├── algebraic.ts         # Result type (Ok/Err)
│   ├── time.ts              # Wrapper timestamp
│   ├── persistence.ts       # Save/load stato da localStorage
│   └── events/              # Event handler utilities
│       ├── on-click-out.ts
│       ├── on-key-down.ts
│       └── on-key-up.ts
public/
├── images/
│   ├── icons/               # Icone app (timer.svg, timer.png, pwa-*.png)
│   └── logos/               # Loghi squadre (.png, .jpg)
└── sounds/
    └── alarm.mp3            # Suono fine timer
```

## Convenzioni di naming

-   **Componenti**: PascalCase (`Timer.svelte`, `LogoChoice.svelte`)
-   **File logica**: kebab-case con suffisso che indica il tipo:
    -   `.state.svelte.ts` — stato reattivo (classi con `$state`)
    -   `.helper.ts` — funzioni pure o side effects associati al componente
-   **Cartelle componenti**: kebab-case, una cartella per componente complesso

## Pattern architetturali

-   **Stato come classi**: lo stato reattivo è gestito tramite classi con campi `$state` e getter/metodi, esportate come singleton
-   **Reattività**: tutti i campi che influenzano la UI devono essere `$state` (incluso `intervalId` per `isRunning()`)
-   **Separazione stato/vista**: ogni componente complesso ha il proprio file `.state.svelte.ts` separato dal `.svelte`
-   **Helper separati**: logica non-reattiva (side effects, dati statici, validazione) in file `.helper.ts`
-   **Lib condivisa**: utility generiche in `src/lib/`, non legate a componenti specifici
-   **Nessun store Svelte classico**: il progetto usa esclusivamente le runes di Svelte 5 (`$state`) al posto di writable/readable store
-   **Azioni su keyup**: gli shortcut da tastiera e il touch usano l'evento di rilascio (keyup/touchend), non la pressione
-   **Auto-sizing font**: il Timer usa `ResizeObserver` + binary search per calcolare il font-size massimo che entra nel container
-   **Persistenza automatica**: un `$effect` in App.svelte salva tutto lo stato in localStorage ad ogni cambiamento
