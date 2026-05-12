# Tech Stack

## Framework e linguaggi

-   **Svelte 5** (runes API: `$state`, `$derived`, `$effect`)
-   **TypeScript** (strict, ESNext target)
-   **Tailwind CSS 3** con PostCSS e Autoprefixer
-   **Vite 5** come bundler e dev server

## Dipendenze runtime

-   `clsx` — utility per classi CSS condizionali

## Dipendenze dev

-   `vite-plugin-pwa` — supporto PWA (manifest, service worker, caching offline)
-   `prettier` + `prettier-plugin-svelte` + `prettier-plugin-tailwindcss` — formattazione
-   `svelte-check` — type checking Svelte

## Font

-   **DSEG7 Classic Bold** — font a 7 segmenti (stile cronometro digitale), self-hosted
-   File in `public/fonts/` (woff2, woff, ttf)
-   `@font-face` dichiarato in `app.css` con `font-display: swap`
-   Classe Tailwind custom: `font-timer` (definita in `tailwind.config.js`)
-   Cifre a larghezza uniforme per definizione (nessun saltello durante il countdown)
-   Licenza: OFL (SIL Open Font License)
-   Il font del resto dell'app è `font-mono` (default)

## PWA

L'app è installabile come Progressive Web App:

-   **Manifest** generato automaticamente da `vite-plugin-pwa`
-   **Service Worker** (Workbox) con strategia `generateSW` e `autoUpdate`
-   **Precaching** di tutti gli asset (JS, CSS, HTML, immagini, suoni, font)
-   **Icone**: `pwa-192x192.png` e `pwa-512x512.png` in `public/images/icons/`

## Persistenza

Lo stato dell'app è salvato in `localStorage` (chiave `timer-dodgeball-state`):

-   Timer: base, remaining, running di entrambi i timer
-   Squadre: loghi, punteggi, swap
-   UI: showPoints, scoresZoom, logoZoom, darkTheme, showDecimals
-   Strategia: `$effect` aggiorna `latestState` reattivamente, `setInterval` (2s) scrive in localStorage, `beforeunload` salva immediatamente prima di chiudere/ricaricare
-   Il modale istruzioni usa un flag separato (`timer-dodgeball-instructions-seen`)

## Comandi

| Comando               | Descrizione            |
| --------------------- | ---------------------- |
| `npm run dev`         | Dev server con HMR     |
| `npm run build`       | Build di produzione    |
| `npm run preview`     | Preview della build    |
| `npm run typecheck`   | Type check Svelte + TS |
| `npm run format`      | Formatta con Prettier  |
| `npm run formatcheck` | Verifica formattazione |

## Note

-   Nessun test framework configurato
-   Nessun linter (solo Prettier per formattazione)
-   Il progetto usa `type: "module"` (ESM)
-   Deploy su Vercel (branch `develop` → `timer-dodgeball-develop.vercel.app`)
