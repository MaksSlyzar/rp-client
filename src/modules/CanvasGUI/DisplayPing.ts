import GameObjectsManager from "../../managers/GameObjectsManager";
import CanvasComponent from "./CanvasComponent";

class DisplayPing extends CanvasComponent {
    pingLabel: HTMLDivElement;

    constructor () {
        super();
        
        this.windowDiv = document.getElementById("gameDiv") as HTMLDivElement;
        this.pingLabel = document.createElement("div") as HTMLDivElement;

        this.pingLabel.style.position = "fixed";
        this.pingLabel.style.fontFamily = "Arial";
        this.pingLabel.style.color = "lime";
        
        this.windowDiv.appendChild(this.pingLabel);
    }

    setPing (ping: number, id: number) {
        if (ping != 0)
            this.pingLabel.innerHTML = `${String(ping)} id:${String(id)}`;
        else 
            this.pingLabel.innerHTML = "No connection";
    }
}

export default DisplayPing;