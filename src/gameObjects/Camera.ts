import MainEngine from "../MainEngine";
import CanvasManager from "../managers/CanvasManager";
import GameObjectsManager from "../managers/GameObjectsManager";
import SIOManager from "../managers/SIOManager";
import { DoItemEvent, MoveToGameObjectEvent } from "./MainPlayer";

class Camera {
    posX: number = -500;
    posY: number = -500;
    speed: number = 10;
    defaultSize: number = 1;

    constructor () {
        CanvasManager.events.setRightOnClick((event) => this.onClick(event));
        CanvasManager.events.setOnKeyUp((keyCode) => this.onKeyUp(keyCode));
    }

    onClick (evt: Event) {
        const targetX = CanvasManager.mouse.x + this.posX;
        const targetY = CanvasManager.mouse.y + this.posY;

        // GameObjectsManager.mainPlayer.globalTargetX = targetX;
        // GameObjectsManager.mainPlayer.globalTargetY = targetY;

        GameObjectsManager.mainPlayer.doTurn = [];

        // const newDoItem = new DoItemEvent();

        // newDoItem.x = targetX;
        // newDoItem.y = targetY;
        // newDoItem.name = "move";
        // newDoItem.anydata = null;
        // newDoItem.onSuccess = () => {

        // }

        // newDoItem.onFail = () => {

        // }

        // GameObjectsManager.mainPlayer.doTurn.push(newDoItem);

        GameObjectsManager.movePoint.posX = targetX;
        GameObjectsManager.movePoint.posY = targetY;

        const newEvent = new MoveToGameObjectEvent(GameObjectsManager.movePoint);

        GameObjectsManager.mainPlayer.subscribeTurn(newEvent);

        newEvent.onSuccess = () => {
            console.log("yes");
        }

        SIOManager.socket.emit("setPlayerTarget", {
            targetX: targetX,
            targetY: targetY,
            id: GameObjectsManager.mainPlayer.id
        });
        
        
        GameObjectsManager.marker.setAlpha();
        
        
    }

    onKeyUp (keyCode: number) {
        if (keyCode == 67) {
            GameObjectsManager.showColliders = !GameObjectsManager.showColliders;
        } // C

    }

    doPosition(x: number, y: number, width: number, height: number) {
        return {
            x: x - this.posX,
            y: y - this.posY,
            width: width / this.defaultSize,
            height: height / this.defaultSize
        }
    }

    update () {
        // this.posX += (GameObjectsManager.mainPlayer.posX - CanvasManager.canvas.width / 2 - 16 - this.posX) * 0.05;
        // this.posY += (GameObjectsManager.mainPlayer.posY - CanvasManager.canvas.height / 2 - 16 - this.posY) * 0.05;
        this.posX = GameObjectsManager.mainPlayer.posX - CanvasManager.canvas.width / 2 - 16;
        this.posY = GameObjectsManager.mainPlayer.posY - CanvasManager.canvas.height / 2 - 16;
        // if (CanvasManager.keyDown("q")) {
        //     this.defaultSize -= 0.01;
        // }
        // if (CanvasManager.keyDown("e")) {
        //     this.defaultSize += 0.01;
        // }
    }

    
}

export default Camera;