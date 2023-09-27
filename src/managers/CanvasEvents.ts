class CanvasEvents {
    public leftClickCallbacks: Array<(event: Event) => void> = [];
    public rightClickCallbacks: Array<(event: Event) => void> = [];
    public keyUpCallbacks: Array<(keyCode: number) => void> = [];

    constructor (canvas: HTMLCanvasElement) {
        canvas.onclick = (event) => {
            this.leftClickCallbacks.map(cb => {
                cb(event);
            });
        };

        canvas.oncontextmenu = (event) => {
            this.rightClickCallbacks.map(cb => {
                cb(event);
            });

            return false;
        };

        window.onresize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    setLeftOnClick (callback: (event: Event) => void) {
        this.leftClickCallbacks.push(callback);
    }

    setRightOnClick (callback: (event: Event) => void) {
        this.rightClickCallbacks.push(callback);
    }
    
    setOnKeyUp (callback: (keyCode: number) => void) {
        this.keyUpCallbacks.push(callback);
    }
}

export default CanvasEvents;