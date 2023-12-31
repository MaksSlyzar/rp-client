import AssetsManager from "../../managers/AssetsManager";
import CanvasManager from "../../managers/CanvasManager";
import GameObjectsManager from "../../managers/GameObjectsManager";
import SIOManager from "../../managers/SIOManager";
import CheckCollision from "../../modules/Collider/CheckCollision";
import GameObject from "../GameObject";
import { DoItemEvent } from "../MainPlayer/MainPlayer";

class TreeWO extends GameObject {
    id: number;
    clickCollider = { 
        // x: 36,
        // y: 36,
        // width: 46,
        // height: 46,
        x: 0,
        y: 0,
        width: 64,
        height: 64
    };

    constructor (id?: number) {
        super();
        this.id = id?id: Math.random() * 100000;
        this.posX = 200;
        this.posY = 200;
    }

    selfOnClick(): void {
        GameObjectsManager.mainPlayer.doTurn = [];

        const newDoItem = new DoItemEvent();

        newDoItem.x = this.posX;
        newDoItem.y = this.posY;
        newDoItem.name = "move";
        newDoItem.anydata = this.id;
        newDoItem.onSuccess = () => {
            console.log("On suc")
            SIOManager.socket.emit("getResource", {
                objectId: this.id,
                playerId: GameObjectsManager.mainPlayer.id
            });
        };
        newDoItem.onFail = () => {};

        GameObjectsManager.mainPlayer.doTurn.push(newDoItem);
    }

    draw () {
        const ctx = CanvasManager.ctx;

        const sprite = AssetsManager.sprites["wo_tree"];

        if (!sprite)
            return;
        
        if (!AssetsManager.sprites["wo_tree_under"])
            return;

        if (!GameObjectsManager.mainPlayer)
            return;

        const playerCollisionObject = {
            x: GameObjectsManager.mainPlayer.posX,
            y: GameObjectsManager.mainPlayer.posY,
            width: 32,
            height: 32
        };

        const selfCollisionObject = {
            x: this.posX - 60,
            y: this.posY - 60,
            width: 160,
            height: 160
        };

        const collisionResult = CheckCollision(playerCollisionObject, selfCollisionObject);

        const drawPosition = GameObjectsManager.camera.doPosition(this.posX, this.posY, 120, 120);

        // console.log(this.posX)
        //Optimization
        if (drawPosition.x - 28 + drawPosition.width < 0)
            return;
        if (drawPosition.x - 28 > CanvasManager.canvas.width)
            return;
        if (drawPosition.y -28 + drawPosition.height < 0)
            return;
        if (drawPosition.y - 28 > CanvasManager.canvas.height)
            return;
            
        if (collisionResult) {
            ctx.drawImage(sprite.image, drawPosition.x - 28, drawPosition.y - 28, 120, 120);
        } else {
            ctx.globalAlpha = 0.2;
            ctx.drawImage(sprite.image, drawPosition.x - 28, drawPosition.y - 28);
            ctx.globalAlpha = 1;
            ctx.drawImage(AssetsManager.sprites["wo_tree_under"].image, drawPosition.x, drawPosition.y);
        }

        if (!GameObjectsManager.showColliders)
            return;
        

        //COLLIDER 
        // ctx.beginPath();
        // ctx.strokeStyle = "darkgreen";
        // ctx.rect(drawPosition.x + this.clickCollider.x, drawPosition.y + this.clickCollider.y, this.clickCollider.width, this.clickCollider.height);
        // ctx.stroke();
        // ctx.closePath();
    }

    getSelfCollisionObject () {
        return {
            x: this.posX,
            y: this.posY,
            width: 120,
            height: 120
        };
    }
}

export default TreeWO;