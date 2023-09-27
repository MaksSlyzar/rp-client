class CanvasComponent {
    windowDiv: HTMLDivElement;
    _display: boolean = false;
    anotherActiveClose: boolean = true;

    constructor () {

    }

    set display (value: boolean) {
        if (!this.windowDiv)
            return;

        if (value)
            this.windowDiv.style.display = "block";
        else
            this.windowDiv.style.display = "none";

        this._display = value;
    }

    get display () {
        return this._display;
    }
}

export default CanvasComponent;