import type { Maybe } from "../../lib/types"

export class TimerState {
    private _base: number = $state(0)
    private _remaining: Maybe<number> = $state(null)
    private _interval: number = $state(0)

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

    start = () => {
        if (this.intervalId) {
            return
        }

        this.intervalId = setInterval(() => {
            this.decrease()
        }, this._interval)
    }

    reset = (opts?: { restoreBase: boolean }) => {
        if (opts?.restoreBase) {
            this._base = this.originalBase
        }

        if (!this.intervalId) {
            return
        }

        this.resetInterval()
        this._remaining = null
    }

    private resetInterval = () => {
        if (!this.intervalId) {
            return
        }

        clearInterval(this.intervalId)
        this.intervalId = null
    }

    private decrease = () => {
        const result =
            this._remaining === null
                ? this._base - this._interval
                : this._remaining - this._interval
        this._remaining = result > 0 ? result : 0

        if (this._remaining === 0) {
            this.resetInterval()
        }
    }
}

export const setTimer = new TimerState(3 * 60 * 1000, 41)
export const timeTimer = new TimerState(15 * 60 * 1000, 41)
