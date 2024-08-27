export type ResultOk<T> = {
    status: "success"
    data: T
}

export type ResultErr = {
    status: "fail"
    error: string
}

export type Result<T> = ResultOk<T> | ResultErr

export const Ok = <T>(data: T): ResultOk<T> => ({ status: "success", data })
export const Err = (error: string): ResultErr => ({ status: "fail", error })

export const isOk = <T>(result: Result<T>): result is ResultOk<T> =>
    result.status === "success"
export const isErr = <T>(result: Result<T>): result is ResultErr =>
    result.status === "fail"
