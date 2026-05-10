# Tech Stack

## Framework e linguaggi

- **Svelte 5** (runes API: `$state`, `$derived`, `$effect`)
- **TypeScript** (strict, ESNext target)
- **Tailwind CSS 3** con PostCSS e Autoprefixer
- **Vite 5** come bundler e dev server

## Dipendenze runtime

- `clsx` — utility per classi CSS condizionali

## Dipendenze dev

- `vite-plugin-pwa` — supporto PWA (manifest, service worker, caching offline)
- `prettier` + `prettier-plugin-svelte` + `prettier-plugin-tailwindcss` — formattazione
- `svelte-check` — type checking Svelte

## PWA

L'app è installabile come Progressive Web App:

- **Manifest** generato automaticamente da `vite-plugin-pwa`
- **Service Worker** (Workbox) con strategia `generateSW` e `autoUpdate`
- **Precaching** di tutti gli asset (JS, CSS, HTML, immagini, suoni)
- **Icone**: `pwa-192x192.png` e `pwa-512x512.png` in `public/images/icons/`

## Comandi

| Comando            | Descrizione              |
| ------------------ | ------------------------ |
| `npm run dev`      | Dev server con HMR       |
| `npm run build`    | Build di produzione      |
| `npm run preview`  | Preview della build      |
| `npm run typecheck`| Type check Svelte + TS   |
| `npm run format`   | Formatta con Prettier    |
| `npm run formatcheck` | Verifica formattazione |

## Note

- Nessun test framework configurato
- Nessun linter (solo Prettier per formattazione)
- Il progetto usa `type: "module"` (ESM)
