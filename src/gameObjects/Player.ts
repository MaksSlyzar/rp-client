import AssetsManager from "../managers/AssetsManager";
import CanvasManager from "../managers/CanvasManager";
import GameObjectsManager from "../managers/GameObjectsManager";
import SIOManager from "../managers/SIOManager";
import { CheckDistanceArc, CheckDistanceRect } from "../modules/Collider/CheckDistance";
import GameObject from "./GameObject";


class Player extends GameObject {
    targetX: number;
    targetY: number;
    id: number;
    globalTargetX: number;
    globalTargetY: number;
    rotation: number;

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
    }

    setPos (posX: number, posY: number) {
        this.posX = posX;
        this.posY = posY;
        console.log(this.posX)
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

        this.posX += (this.targetX - this.posX) * 0.15;
        this.posY += (this.targetY - this.posY) * 0.15;
    }

    draw () {
        CanvasManager.ctx.fillStyle = "blue";
        // console.log(this.posX, this.posY)
        const drawPosition = GameObjectsManager.camera.doPosition(this.posX, this.posY, 32, 32);
        
        // CanvasManager.ctx.translate(drawPosition.x + drawPosition.width / 2, drawPosition.y + drawPosition.height / 2);
        
        // CanvasManager.ctx.save();
        // CanvasManager.ctx.translate(drawPosition.x, drawPosition.y);
        // CanvasManager.ctx.rotate(this.rotation);
        // CanvasManager.ctx.fillRect(-32 / 2, -32 / 2, 32, 32);

        // CanvasManager.ctx.restore();

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
    }
};

export default Player;
