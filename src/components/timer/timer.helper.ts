import { appData } from "../../app.state.svelte"
import type { Maybe } from "../../lib/types"

export const onTimerEnd = () => {
    playWhistle()
    flashBackground()
}

const playWhistle = () => {
    const whistle = new Audio("sounds/alarm.mp3")
    whistle.play()
}

let backgroundTimeout: Maybe<number> = null
const flashBackground = () => {
    appData.redBackground = true

    if (backgroundTimeout !== null) {
        clearTimeout(backgroundTimeout)
    }

    backgroundTimeout = setTimeout(() => {
        appData.redBackground = false
        backgroundTimeout = null
    }, 2500)
}
