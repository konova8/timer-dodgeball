class InstructionsModalState {
    private _isOpen: boolean = $state(
        !localStorage.getItem("timer-dodgeball-instructions-seen"),
    )

    isOpen = () => this._isOpen

    open = () => {
        this._isOpen = true
    }

    close = () => {
        this._isOpen = false
        try {
            localStorage.setItem("timer-dodgeball-instructions-seen", "true")
        } catch {
            // localStorage might be unavailable
        }
    }
}

export const instructionsModal = new InstructionsModalState()
