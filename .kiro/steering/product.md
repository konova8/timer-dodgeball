# Product

Timer Dodgeball è un'applicazione web (PWA installabile) usata come tabellone segnapunti e cronometro per partite di dodgeball.

## Funzionalità principali

- **Due timer indipendenti**: "Set" (3 min default) e "Time" (20 min default), controllabili singolarmente o insieme
- **Timer intelligente**: quando il timer Time è ≤ del timer Set (+50ms margine), il Set viene nascosto e si mostra solo il Time
- **Punteggio per due squadre**: incremento/decremento con possibilità di swap lato
- **Loghi squadre selezionabili**: catalogo di squadre italiane di dodgeball
- **Feedback visivo/sonoro**: flash rosso dello sfondo e suono di allarme allo scadere di un timer
- **Modalità "Last set"**: imposta entrambi i timer a 90 secondi
- **Modifica tempi**: modale per cambiare la durata dei timer a runtime
- **Zoom**: bottoni Zoom +/- per scalare l'area timer (50%-200%)
- **Modale istruzioni**: mostrato all'avvio con le istruzioni d'uso
- **PWA installabile**: funziona offline, installabile su smartphone via "Aggiungi alla schermata Home"

## Controlli

### Tastiera (azione su rilascio tasto)

| Tasto | Azione |
|-------|--------|
| `Spazio` | Avvia il set timer, o ferma entrambi se entrambi attivi (lascia il time timer se solo quello è attivo) |
| `S` | Toggle timer Set |
| `T` | Toggle timer Time |
| `←` | +1 punteggio squadra sinistra |
| `→` | +1 punteggio squadra destra |

### Touch (smartphone)

- Tocco ovunque sullo schermo (esclusi bottoni) = stessa azione dello spazio (al rilascio del dito)
- Selezione testo disabilitata su mobile

## Layout

L'app ha due layout distinti:

- **Tabellone** (desktop/proiezione): layout orizzontale ottimizzato per leggibilità a distanza su schermo proiettato (font grandi responsive con `clamp()`, colori ad alto contrasto su sfondo scuro, divisore nero tra i timer)
- **Smartphone**: layout verticale compatto per il controllo da parte dell'arbitro/operatore

Il passaggio tra i due layout è gestito tramite breakpoint responsive (Tailwind `lg:`).

## Contesto d'uso

L'app è pensata per essere proiettata su schermo durante tornei/partite, con lo smartphone usato dall'operatore come telecomando per controllare timer e punteggi.
