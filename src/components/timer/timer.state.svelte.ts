import { timestamp } from "../../lib/time"
import type { Maybe } from "../../lib/types"
import { onTimerEnd } from "./timer.helper"

export class TimerState {
    private _base: number = $state(0)
    private _remaining: Maybe<number> = $state(null)
    private _interval: number = $state(0)

    private lastIntervalTimestamp: number = $state(-1)
    private originalBase: number
    private intervalId: Maybe<ReturnType<typeof setInterval>> = null

    constructor(base: number, interval: number) {
        this._base = base
        this.originalBase = base
        this._interval = interval
    }

    get base() {
        return this._base
    }

    setBase = (timeMs: number) => {
        this._base = timeMs
    }

    get remaining() {
        return this._remaining
    }

    setRemaining = (timeMs: Maybe<number>) => {
        this._remaining = timeMs
    }

    start = () => {
        if (this.intervalId || this._remaining === 0) {
            return
        }

        this.lastIntervalTimestamp = timestamp()
        this.intervalId = setInterval(() => {
            const now = timestamp()
            this.decrease()
            this.lastIntervalTimestamp = now
        }, this._interval)
    }

    pause = () => {
        if (!this.intervalId) {
            return
        }

        this.decrease()
        this.resetInterval()
    }

    reset = (opts?: { restoreBase: boolean }) => {
        if (opts?.restoreBase) {
            this._base = this.originalBase
        }

        this.resetInterval()
        this._remaining = null
    }

    pendingResume = () => this.intervalId === null && this._remaining !== 0

    isRunning = () => this.intervalId !== null

    adjustTime = (deltaMs: number) => {
        if (this.isRunning()) return

        if (this._remaining !== null) {
            this._remaining = Math.max(0, this._remaining + deltaMs)
        } else {
            this._base = Math.max(0, this._base + deltaMs)
        }
    }

    private resetInterval = () => {
        if (!this.intervalId) {
            return
        }

        clearInterval(this.intervalId)
        this.intervalId = null
    }

    private decrease = () => {
        const now = timestamp()
        const actualElapsed = now - this.lastIntervalTimestamp

        const result =
            this._remaining === null
                ? this._base - actualElapsed
                : this._remaining - actualElapsed
        this._remaining = result > 0 ? result : 0

        if (this._remaining === 0) {
            onTimerEnd()
            this.resetInterval()
        }
    }
}

export const setTimer = new TimerState(3 * 60 * 1000, 41)
export const timeTimer = new TimerState(20 * 60 * 1000, 41)
