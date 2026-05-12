# Product

Timer Dodgeball è un'applicazione web (PWA installabile) usata come tabellone segnapunti e cronometro per partite di dodgeball.

## Funzionalità principali

### Timer

-   **Due timer indipendenti**: "Set" (3 min default) e "Time" (20 min default)
-   **Timer intelligente**: quando il timer Time è ≤ del timer Set (+50ms margine), il Set viene nascosto e si mostra solo il Time, centrato verticalmente
-   **Auto-sizing font**: il testo del timer (DSEG7 Classic Bold, stile 7 segmenti) riempie automaticamente tutto lo spazio disponibile (binary search + ResizeObserver)
-   **Decimali opzionali**: mostra/nascondi i centesimi di secondo (toggle nel menu More)
-   **Controlli rapidi per timer**: bottoni +1m, -1m, +1s, -1s (disabilitati quando il timer è in esecuzione)
-   **Play/Pause unificato**: un solo bottone che cambia icona e colore (▶ verde / ⏸ giallo)
-   **Modalità "Last set"**: imposta entrambi i timer a 90 secondi
-   **Modifica tempi**: modale per cambiare la durata dei timer a runtime (formato MM:SS)
-   **Feedback visivo/sonoro**: flash rosso dello sfondo e suono di allarme allo scadere di un timer
-   **Allarme anche con adjustTime**: se i bottoni -1m/-1s portano il tempo a 0, scatta l'allarme

### Feedback pressione

-   **Sfondo giallo ocra** mentre si tiene premuto spazio o si tocca lo schermo
-   Al rilascio lo sfondo torna normale e l'azione viene eseguita
-   Feedback visivo chiaro di "sto per far partire/fermare il timer"

### Punteggio

-   **Punteggio per due squadre**: sempre 2 cifre (00, 01, ...), font DSEG7
-   **Loghi squadre selezionabili**: catalogo di squadre italiane di dodgeball
-   **Zoom indipendenti**: scores zoom (solo numeri, non bottoni) e logo zoom (dimensioni reali nel layout)
-   **Swap teams**: scambia lato delle due squadre
-   **Show/Hide points**: nasconde la sezione punteggi

### Temi e UI

-   **Tema chiaro** (default): sfondo bianco, per proiezione su parete bianca
-   **Tema scuro**: sfondo nero, per uso su tablet (più visibilità)
-   **Selezione testo disabilitata** ovunque

### Persistenza

-   Tutto lo stato è salvato in localStorage (ogni 2s + beforeunload)
-   Timer ripartono automaticamente dopo un reload se erano in esecuzione
-   Modale istruzioni mostrato solo alla prima visita

## Controlli

### Toolbar (uguale su mobile e desktop)

Bottoni visibili: ▶/⏸ All, ⏹ All, Last set, More ▾

Menu "More" contiene: Swap teams, Change times, Hide/Show points, Scores zoom +/-, Logo zoom +/-, Hide/Show decimals, Dark/Light theme, Instructions, Full reset

Il menu si apre verso l'alto su mobile (toolbar in basso), verso il basso su desktop (toolbar in alto).

### Bottoni sotto ogni timer

-   Sinistra: ▶/⏸ (play/pause) + ⏹ (reset)
-   Padding di separazione
-   Destra: +1m, -1m, +1s, -1s (modifica tempo, disabilitati se il timer è attivo)

### Tastiera (azione su rilascio tasto)

| Tasto    | Azione                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------ |
| `Spazio` | Avvia il set timer, o ferma entrambi se entrambi attivi (lascia il time timer se solo quello è attivo) |
| `S`      | Toggle timer Set                                                                                       |
| `T`      | Toggle timer Time                                                                                      |
| `←`      | +1 punteggio squadra sinistra                                                                          |
| `→`      | +1 punteggio squadra destra                                                                            |

Tenere premuto spazio mostra sfondo giallo (feedback visivo).

### Touch (smartphone)

-   Tocco ovunque sullo schermo (esclusi bottoni) = stessa azione dello spazio
-   Tenere premuto = sfondo giallo, rilasciare = azione
-   touchcancel resetta lo stato

## Layout

Layout unico responsive:

-   **Desktop/Proiezione** (`lg:` breakpoint): toolbar in alto, timer al centro (font auto-sized), punteggi + loghi in basso
-   **Smartphone** (`flex-col-reverse`): punteggi in alto, timer al centro, toolbar in basso
-   Timer sempre in colonna (uno sopra l'altro)
-   Loghi negli angoli in basso (solo desktop), con dimensioni reali che partecipano al layout
-   Gap tra punteggi si riduce con lo scores zoom per evitare overflow

## Contesto d'uso

L'app è pensata per essere proiettata su schermo durante tornei/partite di dodgeball, con lo smartphone usato dall'operatore come telecomando per controllare timer e punteggi. Il tema chiaro è per la proiezione su parete bianca, il tema scuro per l'uso diretto su tablet.

## Z-index layering

| Layer            | z-index | Contenuto                          |
| ---------------- | ------- | ---------------------------------- |
| Modali           | z-50    | TimeChangeModal, InstructionsModal |
| Menu dropdown    | z-40    | Contenuto del menu More            |
| Toolbar          | z-20    | Bottoni in alto/basso              |
| Timer + Punteggi | z-10    | Area centrale                      |
| Loghi            | z-0     | Dietro a tutto                     |
