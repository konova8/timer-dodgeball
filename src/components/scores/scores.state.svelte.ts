import type { Maybe } from "../../lib/types"
import type { TeamLogo } from "./scores.helper"

export class TeamData {
    score: number = $state(0)
    logo: Maybe<TeamLogo> = "aidb"

    changeScore = (amount: number) => () => {
        this.score += amount
    }

    setLogo = (logo: TeamLogo) => {
        this.logo = logo
    }

    resetScore = () => {
        this.score = 0
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
