class AppData {
    redBackground: boolean = $state(false)
    private _showPoints: boolean = $state(true)
    private _scoresZoom: number = $state(100)
    private _logoZoom: number = $state(100)

    get showPoints() {
        return this._showPoints
    }

    togglePoints = () => {
        this._showPoints = !this._showPoints
    }

    get scoresZoom() {
        return this._scoresZoom
    }

    scoresZoomIn = () => {
        this._scoresZoom = Math.min(this._scoresZoom + 10, 200)
    }

    scoresZoomOut = () => {
        this._scoresZoom = Math.max(this._scoresZoom - 10, 50)
    }

    get logoZoom() {
        return this._logoZoom
    }

    logoZoomIn = () => {
        this._logoZoom = Math.min(this._logoZoom + 10, 200)
    }

    logoZoomOut = () => {
        this._logoZoom = Math.max(this._logoZoom - 10, 50)
    }
}

export const appData = new AppData()
