import AssetsManager from "../managers/AssetsManager";
import CanvasManager from "../managers/CanvasManager";
import GameObjectsManager from "../managers/GameObjectsManager";
import SIOManager from "../managers/SIOManager";
import { CheckDistanceArc, CheckDistanceRect } from "../modules/Collider/CheckDistance";
import GameObject from "./GameObject";

export class DoItemEvent {
    x: number;
    y: number;
    name: string;
    anydata: any;
    onSuccess: () => void;
    onFail: () => void;
    start: boolean = false;
    
    constructor () {

    }
};

class TurnEvent {

}

export class MoveToGameObjectEvent extends TurnEvent {
    onSuccess: () => void;
    onFail: () => void;

    start: boolean = false;

    gameObject: GameObject;

    constructor (gameObject: GameObject) {
        super();

        this.gameObject = gameObject;
    }
}

export class GetResourceEvent extends TurnEvent {
    gameObject: GameObject;
    
    constructor () {
        super();
    }
}

class MainPlayer extends GameObject {
    targetX: number;
    targetY: number;
    id: number;
    globalTargetX: number;
    globalTargetY: number;
    rotation: number;
    doTurn: TurnEvent[] = [];
    targetRotation: number;
    rotationSpeed: number;
    movespeed = 4;
    isMove: boolean = false;

    collider = { 
        x: 0, 
        y: 0, 
        width: 64, 
        height: 64
    };

    constructor () {
        super();

        this.rotation = 0;

        this.targetX = 0;
        this.targetY = 0;

        this.posX = 0;
        this.posY = 0;
    }

    setPos (posX: number, posY: number) {
        this.posX = posX;
        this.posY = posY;
    }

    update (dt: number) {

        // this.posX += (this.targetX - this.posX) * (dt / 100);
        // this.posY += (this.targetY - this.posY) * (dt / 100);
        // this.posX += (this.targetX - this.posX) * 0.25;
        // this.posY += (this.targetY - this.posY) * 0.25;
        // console.log(this.posX, this.posY)

        // GameObjectsManager.mainPlayer.globalTargetX = targetX;
        // GameObjectsManager.mainPlayer.globalTargetY = targetY;

        // if (this.doTurn.length != 0) {
        //     if (this.doTurn[0].name == "move") {
        //         if (this.doTurn[0].start == false) {
        //             this.doTurn[0].start = true;
        //             SIOManager.socket.emit("setPlayerTarget", {
        //                 targetX: this.doTurn[0].x,
        //                 targetY: this.doTurn[0].y,
        //                 id: GameObjectsManager.mainPlayer.id
        //             });
        //         }

        //         this.posX += (this.targetX - this.posX) * 0.25;
        //         this.posY += (this.targetY - this.posY) * 0.25;

        //         const otherObject = {
        //             x: this.doTurn[0].x,
        //             y: this.doTurn[0].y,
        //             width: 1,
        //             height: 1
        //         };

        //         if (CheckDistanceRect(this.getPosWithCollider(), otherObject) < 5) {
                    
        //             this.doTurn[0].onSuccess();
        //             this.doTurn.splice(0, 1);

        //         }
                
            
        //     }
        // }

        // if (this.getTurnEvent() == null)
        //     return;

        // const turnEvent = this.getTurnEvent();
        
        // if (turnEvent instanceof MoveToGameObjectEvent) {
        this.posX += (this.targetX - this.posX) * 0.15;
        this.posY += (this.targetY - this.posY) * 0.15;
        
        // } else {
        //     console.log(turnEvent)
        // }

        let direction = "";

        if (CanvasManager.keyDown("d")) {
            direction += "right;";
        }
        if (CanvasManager.keyDown("a")) {
            direction += "left;";
        }
        if (CanvasManager.keyDown("w")) {
            direction += "up;";
        }
        if (CanvasManager.keyDown("s")) {
            direction += "down;";
        }

        SIOManager.socket.emit("player-move-direction", {
            id: this.id,
            direction: direction
        });
    }

    draw () {
        CanvasManager.ctx.fillStyle = "white";
        // console.log(this.posX, this.posY)
        const drawPosition = GameObjectsManager.camera.doPosition(this.posX, this.posY, 64, 64);
         
        // CanvasManager.ctx.translate(drawPosition.x + drawPosition.width / 2, drawPosition.y + drawPosition.height / 2);
    

        // if (this.targetRotation - this.rotation > 0.04 && this.targetRotation - this.rotation < 0.04)
        //     this.rotation = this.targetRotation;

        // if (this.targetRotation > this.rotation) {
        //     this.rotation -= 0.02;
        // }
        // if (this.targetRotation < this.rotation) {
        //     this.rotation += 0.02;
        // }

        ///RESTORE
        // CanvasManager.ctx.save();
        // CanvasManager.ctx.translate(drawPosition.x, drawPosition.y);
        // CanvasManager.ctx.rotate(this.targetRotation);
        // CanvasManager.ctx.fillRect(-32 / 2, -32 / 2, 32, 32);

        // CanvasManager.ctx.restore();
    
        // CanvasManager.ctx.fillRect(drawPosition.x, drawPosition.y, 32, 32);
        // CanvasManager.ctx.drawImage(AssetsManager.sprites["char"].image, drawPosition.x, drawPosition.y);

        CanvasManager.ctx.fillStyle = "white";
        CanvasManager.ctx.save();
        CanvasManager.ctx.translate(drawPosition.x, drawPosition.y);

        const dx = this.targetX - this.posX;
        const dy = this.targetY - this.posY;

        // Обчислюємо кут в радіанах від точки A до точки B
        const angleRadians = Math.atan2(dy, dx);

        CanvasManager.ctx.rotate(angleRadians);
        // CanvasManager.ctx.fillRect(-16, -16, 32, 32);
        CanvasManager.ctx.drawImage(AssetsManager.sprites["char-3"].image, -16, -16);
        CanvasManager.ctx.restore();

        //Draw id player 
        const playerId = "ID: " + String(this.id);
        CanvasManager.ctx.font = "16px Arial";
        CanvasManager.ctx.fillText(playerId, drawPosition.x - playerId.length / 2 * 8, drawPosition.y - 25);

    }

    clearTurn () {
        this.doTurn = [];
    }

    subscribeTurn (event: TurnEvent) {
        this.doTurn.push(event);
    }
    
    getTurnEvent () {
        return this.doTurn.length == 0 ? null: this.doTurn[0];
    }
};

export default MainPlayer;
