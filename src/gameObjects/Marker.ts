import CanvasManager from "../managers/CanvasManager";
import GameObjectsManager from "../managers/GameObjectsManager";
import CheckCollision from "../modules/Collider/CheckCollision";
import GameObject from "./GameObject";

class Marker extends GameObject {
    alpha: number;
    selectedObject: GameObject|null;

    constructor () {
        super();
        this.alpha = 1;
        CanvasManager.events.setLeftOnClick((event) => this.onClick(event));
    }

    setAlpha () {
        this.alpha = 1;
    }

    update () {
        
    }

    onRightClick (event: Event) {
        
    }

    onClick (event: Event) {
        const targetX = CanvasManager.mouse.x + GameObjectsManager.camera.posX;
        const targetY = CanvasManager.mouse.y + GameObjectsManager.camera.posY;

        //set target for fight
        const selectedObjects = GameObjectsManager.worldObjects.filter(wo => {
            if (wo.clickCollider == null) return false;

            const worldObjectForCollision = {
                x: wo.posX + wo.clickCollider.x,
                y: wo.posY + wo.clickCollider.y,
                width: wo.clickCollider.width,
                height: wo.clickCollider.height
            };

            const selfObjectForCollision = {
                x: targetX,
                y: targetY,
                width: 5,
                height: 5
            };

            return !CheckCollision(worldObjectForCollision, selfObjectForCollision);
        });

        if (selectedObjects.length == 0)
            return;

        this.selectedObject = selectedObjects[0];

        this.selectedObject.selfOnClick();
    }

    draw () {
        CanvasManager.ctx.fillStyle = "red";
        const player = GameObjectsManager.mainPlayer;
        
        if (!player)
            return;

        if (this.alpha > 0)
            this.alpha -= 0.05;
        else
            this.alpha = 0;
        const drawPosition = GameObjectsManager.camera.doPosition(player.globalTargetX, player.globalTargetY, 16, 16);
        CanvasManager.ctx.globalAlpha = this.alpha;
        CanvasManager.ctx.fillRect(drawPosition.x + 25, drawPosition.y + 25, 16, 15);
        CanvasManager.ctx.globalAlpha = 1;

        if (this.selectedObject == null) return;

        const drawSelectedObject = GameObjectsManager.camera.doPosition(this.selectedObject.clickCollider.x + this.selectedObject.posX,
                                                                       this.selectedObject.clickCollider.y + this.selectedObject.posY,
                                                                        this.selectedObject.clickCollider.width, this.selectedObject.clickCollider.height);

        CanvasManager.ctx.fillStyle = "red";
        CanvasManager.ctx.beginPath();
        CanvasManager.ctx.rect(drawSelectedObject.x, drawSelectedObject.y, drawSelectedObject.width, drawSelectedObject.height);
        CanvasManager.ctx.stroke();
        CanvasManager.ctx.closePath();
    }
}

export default Marker;
