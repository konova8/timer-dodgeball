# Project Structure

```
src/
├── main.ts                  # Entry point
├── App.svelte               # Root component (layout, controlli, shortcut)
├── app.css                  # Stili globali Tailwind + classi btn + timer
├── app.state.svelte.ts      # Stato globale app (redBackground, zoom)
├── components/
│   ├── timer/               # Timer countdown
│   │   ├── Timer.svelte
│   │   ├── timer.state.svelte.ts   # Classe TimerState (logica countdown)
│   │   └── timer.helper.ts         # Side effects (suono, flash)
│   ├── scores/              # Punteggio squadre
│   │   ├── Scores.svelte
│   │   ├── SingleScore/SingleScore.svelte
│   │   ├── scores.state.svelte.ts  # Classi TeamData, TeamSwap
│   │   └── scores.helper.ts        # Dati loghi squadre
│   ├── logo-choice/         # Selettore logo squadra
│   │   └── LogoChoice.svelte
│   └── modals/
│       ├── instructions-modal/      # Modale istruzioni (mostrato all'avvio)
│       │   ├── InstructionsModal.svelte
│       │   └── instructions-modal.state.svelte.ts
│       └── time-change-modal/
│           ├── TimeChangeModal.svelte
│           ├── time-change-modal.state.svelte.ts
│           └── time-change-modal.helper.ts
├── lib/                     # Utility condivise
│   ├── types.ts             # Tipi generici (Maybe<T>, Svelte namespace)
│   ├── algebraic.ts         # Result type (Ok/Err)
│   ├── time.ts              # Wrapper timestamp
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

- **Componenti**: PascalCase (`Timer.svelte`, `LogoChoice.svelte`)
- **File logica**: kebab-case con suffisso che indica il tipo:
  - `.state.svelte.ts` — stato reattivo (classi con `$state`)
  - `.helper.ts` — funzioni pure o side effects associati al componente
- **Cartelle componenti**: kebab-case, una cartella per componente complesso

## Pattern architetturali

- **Stato come classi**: lo stato reattivo è gestito tramite classi con campi `$state` e getter/metodi, esportate come singleton
- **Separazione stato/vista**: ogni componente complesso ha il proprio file `.state.svelte.ts` separato dal `.svelte`
- **Helper separati**: logica non-reattiva (side effects, dati statici, validazione) in file `.helper.ts`
- **Lib condivisa**: utility generiche in `src/lib/`, non legate a componenti specifici
- **Nessun store Svelte classico**: il progetto usa esclusivamente le runes di Svelte 5 (`$state`) al posto di writable/readable store
- **Azioni su keyup**: gli shortcut da tastiera e il touch usano l'evento di rilascio (keyup/touchend), non la pressione
