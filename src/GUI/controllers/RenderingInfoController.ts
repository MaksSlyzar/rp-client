class RenderingInfoController {
    infoDiv: HTMLDivElement;

    constructor () {
        this.infoDiv = document.getElementById("renderingInfo") as HTMLDivElement;
    }

    changeFps (fps: number) {
        this.infoDiv.innerHTML = "FPS: " + fps;
    }
}

export default RenderingInfoController;