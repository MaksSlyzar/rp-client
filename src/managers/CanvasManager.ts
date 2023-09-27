
import DisplayPing from "../modules/CanvasGUI/DisplayPing";
import CanvasEvents from "./CanvasEvents";

interface KeyValue {
    [key: string]: boolean
};

class CanvasManager {
    public ctx: CanvasRenderingContext2D|null;
    public canvas: HTMLCanvasElement;
    public gameDiv: HTMLElement|null;
    public mouse: { x: number, y: number };
    public keysString: KeyValue = {};
    public events: CanvasEvents;
    public DisplayPing: DisplayPing;
    // public buildPanel: BuildPanel|null = null;

    constructor () {
        this.mouse = {
            x: 0,
            y: 0
        };
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.events = new CanvasEvents(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.gameDiv = document.getElementById("gameDiv");

        this.DisplayPing = new DisplayPing();
        this.setCanvasEvents();
        this.windowResizeUpdate();
        // this.buildPanel = new BuildPanel(this, buildController);
    }

    setCanvasEvents () {
        window.onresize = this.windowResizeUpdate;
        window.onmousemove = (evt) => {
            this.mouse.x = evt.clientX;
            this.mouse.y = evt.clientY;
        };
        window.onkeydown = (evt) => {
            this.keysString[evt.key] = true;
        };
        window.onkeyup = (evt) => {
            this.events.keyUpCallbacks.map((cb) => cb(evt.keyCode));

            if (!this.keysString[evt.key])
                return;
            this.keysString[evt.key] = false;
        };
    }

    windowResizeUpdate () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    clear () {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    keyDown (char: string) {
        return this.keysString[char];
    }

    start() {

    }
}

export default new CanvasManager();