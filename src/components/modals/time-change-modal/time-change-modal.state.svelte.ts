class TimeChangeModal {
    private _open: boolean = $state(false)

    open = () => (this._open = true)
    close = () => (this._open = false)
    isOpen = () => this._open === true
}

export const timeChangeModal = new TimeChangeModal()
