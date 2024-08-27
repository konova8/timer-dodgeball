import { Err, Ok, type Result } from "../../../lib/algebraic"

export const toTimeString = (timeMs: number): string => {
    const minutes = Math.floor(timeMs / 1000 / 60)
    const seconds = Math.floor((timeMs - minutes * 1000 * 60) / 1000)

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

export const fromTimeString = (timeString: string): Result<number> => {
    if (timeString.length !== 5) {
        return Err(
            `time string has length ${timeString.length} when it should be 5`,
        )
    }

    const split = timeString.split(":")
    if (split.length !== 2 || split[0].length !== 2 || split[1].length !== 2) {
        return Err(
            `malformed time string, could not split properly around \`:\``,
        )
    }

    const minutes = parseInt(split[0])
    if (isNaN(minutes) || minutes < 0 || minutes > 59) {
        return Err(`parsed minutes value is out of bounds: ${minutes}`)
    }

    const seconds = parseInt(split[1])
    if (isNaN(seconds) || seconds < 0 || seconds > 59) {
        return Err(`parsed seconds value is out of bounds: ${seconds}`)
    }

    return Ok(minutes * 1000 * 60 + seconds * 1000)
}
