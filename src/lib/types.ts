export type Maybe<T> = T | null

export namespace Svelte {
    export namespace ChangeEvent {
        export type Select = Event & {
            currentTarget: EventTarget & HTMLSelectElement
        }
    }
}
