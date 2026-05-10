export const onKeyUp = (
    keys: string | string[],
    cb: (e: KeyboardEvent) => void,
    signal: AbortSignal,
) => {
    document.addEventListener(
        "keyup",
        e => {
            if (
                (Array.isArray(keys) && !keys.some(k => k === e.key)) ||
                (typeof keys === "string" && e.key !== keys)
            ) {
                return
            }

            e.preventDefault()
            cb(e)
        },
        {
            signal,
        },
    )
}
