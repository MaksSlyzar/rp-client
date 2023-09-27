import AssetsManager from "../../managers/AssetsManager";
import CanvasManager from "../../managers/CanvasManager";
import GameObjectsManager from "../../managers/GameObjectsManager";
import House from "../builds/House";
import GameObject from "./../GameObject";

class Unit extends GameObject {
    targetX: number;
    targetY: number;
    id: number;
    globalTargetX: number;
    globalTargetY: number;
    rotation: number;

    house: House;

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
        console.log(this.posX)
    }

    update (dt: number) {
        // console.log(this.targetX)
        // this.posX += (this.targetX - this.posX) * (dt / 100);
        // this.posY += (this.targetY - this.posY) * (dt / 100);
        // console.log(this.posX)
        this.posX += (this.targetX - this.posX) * 0.25;
        this.posY += (this.targetY - this.posY) * 0.25;

        // console.log(this.posX, this.posY)
    }

    draw () {
        CanvasManager.ctx.fillStyle = "white";
        // console.log(this.posX, this.posY)
        const drawPosition = GameObjectsManager.camera.doPosition(this.posX, this.posY, 50, 50);
        
        // CanvasManager.ctx.translate(drawPosition.x + drawPosition.width / 2, drawPosition.y + drawPosition.height / 2);
        // CanvasManager.ctx.translate(drawPosition.x + drawPosition.width / 2, drawPosition.y + drawPosition.height / 2);
    

        // if (this.targetRotation - this.rotation > 0.04 && this.targetRotation - this.rotation < 0.04)
        //     this.rotation = this.targetRotation;

        // if (this.targetRotation > this.rotation) {
        //     this.rotation -= 0.02;
        // }
        // if (this.targetRotation < this.rotation) {
        //     this.rotation += 0.02;
        // }
        // CanvasManager.ctx.fillStyle = "red";
        // CanvasManager.ctx.fillRect(drawPosition.x, drawPosition.y, 32, 32);
        CanvasManager.ctx.fillStyle = "white";
        CanvasManager.ctx.save();
        CanvasManager.ctx.translate(drawPosition.x, drawPosition.y);

        const dx = this.targetX - this.posX;
        const dy = this.targetY - this.posY;

        // Обчислюємо кут в радіанах від точки A до точки B
        const angleRadians = Math.atan2(dy, dx);

        CanvasManager.ctx.rotate(angleRadians);
        // CanvasManager.ctx.fillRect(-16, -16, 32, 32);
        CanvasManager.ctx.drawImage(AssetsManager.sprites["char"].image, -16, -16);
        CanvasManager.ctx.restore();

        // this.rotation += 0.02;
    }
};

export default Unit;
