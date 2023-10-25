import AssetsManager from "../../managers/AssetsManager";
import CanvasManager from "../../managers/CanvasManager";
import GameObjectsManager from "../../managers/GameObjectsManager";
import SIOManager from "../../managers/SIOManager";
import { CheckDistanceArc, CheckDistanceRect } from "../../modules/Collider/CheckDistance";
import GameObject from "../GameObject";
import { AnimationComponent } from "../components/AnimationComponent";

import playerMoveAnimation from "../../assets/animations/player/move_animation.json";

class Player extends GameObject {
    targetX: number;
    targetY: number;
    id: number;
    globalTargetX: number;
    globalTargetY: number;
    rotation: number;
    direction: "RIGHT"|"LEFT"|"UP"|"DOWN"|"RIGHT-UP"|"LEFT-UP"|"LEFT-DOWN"|"RIGHT-DOWN" = "LEFT";
    isMove: boolean = false;

    animationComponent: AnimationComponent;
    lastPosX: number = 0;
    lastPosY: number = 0;

    collider = { 
        x: 0, 
        y: 0, 
        width: 32, 
        height: 32
    };

    constructor () {
        super();

        this.rotation = 0;

        this.targetX = 0;
        this.targetY = 0;

        this.posX = 0;
        this.posY = 0;

        this.animationComponent = new AnimationComponent();

        this.animationComponent.linkAnimation(playerMoveAnimation);
        this.animationComponent.drawSize = {
            width: 64,
            height: 64
        }
    }

    setPos (posX: number, posY: number) {
        this.posX = posX;
        this.posY = posY;
    }

    update (dt: number) { 
        

        if (Math.floor(this.lastPosX) == Math.floor(this.posX) && Math.floor(this.lastPosY) == Math.floor(this.posY)) {
            this.isMove = false;
        } else {
            this.isMove = true;
        }

        this.lastPosX = this.posX;
        this.lastPosY = this.posY;

        this.posX += (this.targetX - this.posX) * 0.30;
        this.posY += (this.targetY - this.posY) * 0.30;

        
        // console.log(Math.floor(lastPosX),  Math.floor(this.posX), Math.floor(lastPosY), Math.floor(this.posY), this.id)

        if (this.isMove == true) {
            if (this.animationComponent.playAnimationName != "MOVE_" + this.direction) {
                this.animationComponent.setAnimation("MOVE_" + this.direction);
            } 
        } else {
            if ("STAY_" + this.direction != this.animationComponent.playAnimationName) {
                this.animationComponent.setAnimation("STAY_" + this.direction);
            }
        }

        // if (this.isMove) {
        //     if ("MOVE_" + this.direction != this.animationComponent.moveAnimationComponent.playAnimationName) {
        //         this.animationComponent.setAnimation("MOVE_" + this.direction);
        //     }
        // } else {
        //     if ("STAY_" + this.direction != this.animationComponent.moveAnimationComponent.playAnimationName) {
        //         this.animationComponent.setAnimation("STAY_" + this.direction);
        //     }
        // }
    }

    draw (dt: number) {
        CanvasManager.ctx.fillStyle = "blue";

        const drawPosition = GameObjectsManager.camera.doPosition(this.posX, this.posY, 32, 32);

        CanvasManager.ctx.fillStyle = "white";
        // CanvasManager.ctx.save();
        // CanvasManager.ctx.translate(drawPosition.x, drawPosition.y);

        // const dx = this.targetX - this.posX;
        // const dy = this.targetY - this.posY;

        // const angleRadians = Math.atan2(dy, dx);

        // CanvasManager.ctx.rotate(angleRadians);
        // // CanvasManager.ctx.fillRect(-16, -16, 32, 32);
        // CanvasManager.ctx.drawImage(AssetsManager.sprites["char"].image, -16, -16);
        // CanvasManager.ctx.restore();

        this.animationComponent.drawPosition.x = drawPosition.x;
        this.animationComponent.drawPosition.y = drawPosition.y;


        this.animationComponent.draw(dt);
        // console.log(this.animationComponent.playAnimationTileIndex) 

        //Draw id player 
        const playerId = "ID: " + String(this.id);
        CanvasManager.ctx.font = "16px Arial";
        CanvasManager.ctx.fillText(`${this.id}`, drawPosition.x - playerId.length / 2 * 8, drawPosition.y - 25);
    }

    networkData (data: any) {
        this.targetX = data.posX;
        this.targetY = data.posY;
        this.direction = data.direction;

        // console.log(this.direction)

        /*
        posX: this.posX,
        posY: this.posY,
        id: this.id,
        inventory: this.inventory.networkData(),
        direction: this.direction
        */
    }
};

export default Player;
