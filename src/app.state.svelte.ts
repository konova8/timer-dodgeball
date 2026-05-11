class AppData {
    redBackground: boolean = $state(false)
    private _showPoints: boolean = $state(true)
    private _scoresZoom: number = $state(100)
    private _logoZoom: number = $state(100)
    private _darkTheme: boolean = $state(false)
    private _showDecimals: boolean = $state(true)

    get showPoints() {
        return this._showPoints
    }

    setShowPoints = (value: boolean) => {
        this._showPoints = value
    }

    togglePoints = () => {
        this._showPoints = !this._showPoints
    }

    get scoresZoom() {
        return this._scoresZoom
    }

    setScoresZoom = (value: number) => {
        this._scoresZoom = value
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

    setLogoZoom = (value: number) => {
        this._logoZoom = value
    }

    logoZoomIn = () => {
        this._logoZoom = Math.min(this._logoZoom + 10, 200)
    }

    logoZoomOut = () => {
        this._logoZoom = Math.max(this._logoZoom - 10, 50)
    }

    get darkTheme() {
        return this._darkTheme
    }

    setDarkTheme = (value: boolean) => {
        this._darkTheme = value
    }

    toggleTheme = () => {
        this._darkTheme = !this._darkTheme
    }

    get showDecimals() {
        return this._showDecimals
    }

    setShowDecimals = (value: boolean) => {
        this._showDecimals = value
    }

    toggleDecimals = () => {
        this._showDecimals = !this._showDecimals
    }
}

export const appData = new AppData()
