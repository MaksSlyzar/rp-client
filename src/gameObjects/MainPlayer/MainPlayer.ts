import AssetsManager from "../../managers/AssetsManager";
import CanvasManager from "../../managers/CanvasManager";
import GameObjectsManager from "../../managers/GameObjectsManager";
import SIOManager from "../../managers/SIOManager";
import { CheckDistanceArc, CheckDistanceRect } from "../../modules/Collider/CheckDistance";
import Point2D from "../../modules/Point2D";
import GameObject from "../GameObject";
import PlayerAnimationComponent from "./PlayerAnimationComponent";

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
    direction: "RIGHT"|"LEFT"|"UP"|"DOWN"|"RIGHT-UP"|"LEFT-UP"|"LEFT-DOWN"|"RIGHT-DOWN" = "LEFT";
    animationComponent: PlayerAnimationComponent;

    changeDirection: boolean = false;

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

        this.animationComponent = new PlayerAnimationComponent(this);

        this.animationComponent.setAnimation("MOVE_DOWN");
        CanvasManager.events.setOnKeyUp(this.keyUp);
    }

    setPos (posX: number, posY: number) {
        this.posX = posX;
        this.posY = posY;
    }

    update (dt: number) {
        const lastPosX = this.posX;
        const lastPosY = this.posY;

        this.posX += (this.targetX - this.posX) * 0.3;
        this.posY += (this.targetY - this.posY) * 0.3;

        if (Math.floor(lastPosX) == Math.floor(this.posX) && Math.floor(lastPosY) == Math.floor(this.posY)) {
            this.isMove = false;
        } else {
            this.isMove = true;
        }

        const lastDirection = this.direction;

        let direction = "";
        let nowMove = false;

        if (CanvasManager.keyDown("d")) {
            this.direction = "RIGHT";
            nowMove = true;
        }
        if (CanvasManager.keyDown("a")) {
            this.direction = "LEFT";
            nowMove = true;
        }
        if (CanvasManager.keyDown("w")) {
            if (this.direction == "LEFT") {
                this.direction = "LEFT-UP";
            } else if (this.direction == "RIGHT") {
                this.direction = "RIGHT-UP";
            } else
                this.direction = "UP";
            nowMove = true;
        }
        if (CanvasManager.keyDown("s")) {
            if (direction == "LEFT") {
                this.direction = "LEFT-DOWN";
            } else if (this.direction == "RIGHT") {
                this.direction = "RIGHT-DOWN";
            } else
                this.direction = "DOWN";
            nowMove = true;
        }

        if (this.isMove) {
            if ("MOVE_" + this.direction != this.animationComponent.moveAnimationComponent.playAnimationName) {
                this.animationComponent.setAnimation("MOVE_" + this.direction);
            }
        } else {
            if ("STAY_" + this.direction != this.animationComponent.moveAnimationComponent.playAnimationName) {
                this.animationComponent.setAnimation("STAY_" + this.direction);
            }
        }
        // console.log(this.direction)
        // console.log(nowMove, direction)
        if (nowMove) {
            SIOManager.socket.emit("player-move-direction", {
                id: this.id,
                direction: this.direction
            });
        } else {
            
        }
    }

    keyUp = (keyCode: number) => {
        
    }

    draw (dt: number) {
        CanvasManager.ctx.fillStyle = "white";

        const drawPosition = GameObjectsManager.camera.doPosition(this.posX, this.posY, 64, 64);

        CanvasManager.ctx.fillStyle = "white";

        this.animationComponent.setDrawPosition(drawPosition.x, drawPosition.y);

        this.animationComponent.setDrawSize(64, 64);

        this.animationComponent.draw(dt);

        //Draw id player 
        const playerId = "ID: " + String(this.id);
        CanvasManager.ctx.font = "16px Arial";
        CanvasManager.ctx.fillText(playerId, drawPosition.x - playerId.length / 2, drawPosition.y - 25);
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
