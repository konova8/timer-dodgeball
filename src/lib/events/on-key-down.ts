export const onKeyDown = (
    key: string,
    cb: () => void,
    opts?: { signal: AbortSignal },
) => {
    document.addEventListener(
        "keydown",
        e => {
            if (e.key !== key) {
                return
            }

            cb()
        },
        {
            signal: opts?.signal,
        },
    )
}
