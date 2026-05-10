class InstructionsModalState {
    private _isOpen: boolean = $state(true)

    isOpen = () => this._isOpen

    close = () => {
        this._isOpen = false
    }
}

export const instructionsModal = new InstructionsModalState()
