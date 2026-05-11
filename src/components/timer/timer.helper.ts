import { appData } from "../../app.state.svelte"
import type { Maybe } from "../../lib/types"

export const onTimerEnd = () => {
    playAlarm()
    flashBackground()
}

const alarm = new Audio("sounds/alarm.mp3")
alarm.preload = "auto"

const playAlarm = () => {
    alarm.currentTime = 0
    alarm.play()
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
