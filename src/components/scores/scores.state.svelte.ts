import type { Maybe } from "../../lib/types"
import type { TeamLogo } from "./scores.helper"

export class TeamData {
    private _logo: Maybe<TeamLogo> = $state(null)
    private _score: number = $state(0)

    get logo() {
        return this._logo
    }

    setLogo = (logo: Maybe<TeamLogo>) => {
        this._logo = logo
    }

    get score() {
        return this._score
    }

    changeScore = (amount: number) => () => {
        this._score += amount
    }

    resetScore = () => {
        this._score = 0
    }
}

export const teamData: [TeamData, TeamData] = [new TeamData(), new TeamData()]

export class TeamSwap {
    public active: boolean = $state(false)

    toggle = () => {
        this.active = !this.active
    }
}
export const teamSwap = new TeamSwap()

export const leftTeamKey = () => (teamSwap.active ? 1 : 0)
export const rightTeamKey = () => (teamSwap.active ? 0 : 1)
