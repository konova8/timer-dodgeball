class AppData {
    redBackground: boolean = $state(false)
    private _zoom: number = $state(100)
    private _showPoints: boolean = $state(true)
    private _scoresZoom: number = $state(100)

    get zoom() {
        return this._zoom
    }

    zoomIn = () => {
        this._zoom = Math.min(this._zoom + 10, 200)
    }

    zoomOut = () => {
        this._zoom = Math.max(this._zoom - 10, 50)
    }

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
}

export const appData = new AppData()
