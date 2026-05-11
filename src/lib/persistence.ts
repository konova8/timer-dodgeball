const STORAGE_KEY = "timer-dodgeball-state"

export type PersistedState = {
    setTimerBase: number
    setTimerRemaining: number | null
    timeTimerBase: number
    timeTimerRemaining: number | null
    team0Logo: string | null
    team1Logo: string | null
    team0Score: number
    team1Score: number
    teamSwapActive: boolean
    showPoints: boolean
    scoresZoom: number
    logoZoom: number
    darkTheme: boolean
    instructionsSeen: boolean
}

export const saveState = (state: PersistedState): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
        // localStorage might be unavailable
    }
}

export const loadState = (): PersistedState | null => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return null
        return JSON.parse(raw) as PersistedState
    } catch {
        return null
    }
}
