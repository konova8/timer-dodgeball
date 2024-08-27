import type { Maybe } from "../types"

export const onClickOut = <T extends HTMLElement>(
    getEl: () => Maybe<T>,
    cb: () => void,
    signal: AbortSignal,
) => {
    document.addEventListener(
        "click",
        e => {
            const el = getEl()
            if (
                el &&
                e.target instanceof Node &&
                !el.contains(e.target) &&
                !e.defaultPrevented
            ) {
                cb()
            }
        },
        {
            signal,
        },
    )
}
