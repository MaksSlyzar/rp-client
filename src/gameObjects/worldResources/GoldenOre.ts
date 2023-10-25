import AssetsManager from "../../managers/AssetsManager";
import CanvasManager from "../../managers/CanvasManager";
import GameObjectsManager from "../../managers/GameObjectsManager";
import CheckCollision from "../../modules/Collider/CheckCollision";
import GameObject from "../GameObject";

class GoldenOreWO extends GameObject {
    id: number;
    clickCollider = { 
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

    draw () {
        const ctx = CanvasManager.ctx;

        const sprite = AssetsManager.sprites["golden_ore"];

        if (!sprite)
            return;
        
        if (!AssetsManager.sprites["golden_ore"])
            return;

        if (!GameObjectsManager.mainPlayer)
            return;

        const drawPosition = GameObjectsManager.camera.doPosition(this.posX, this.posY, 120, 120);


        //Optimization
        if (drawPosition.x + drawPosition.width < 0)
            return;
        if (drawPosition.x > CanvasManager.canvas.width)
            return;
        if (drawPosition.y + drawPosition.height < 0)
            return;
        if (drawPosition.y > CanvasManager.canvas.height)
            return;
            
        ctx.drawImage(sprite.image, drawPosition.x, drawPosition.y);
        
        if (!GameObjectsManager.showColliders)
            return;
        
        // ctx.beginPath();
        // ctx.strokeStyle = "darkgreen";
        // ctx.rect(drawPosition.x + this.clickCollider.x, drawPosition.y + this.clickCollider.y, this.clickCollider.width, this.clickCollider.height);
        // ctx.stroke();
        // ctx.closePath();
    }
    
    selfOnClick(): void {
        
    }
}

export default GoldenOreWO;