import AssetsManager from "../../managers/AssetsManager";
import CanvasManager from "../../managers/CanvasManager";
import GameObjectsManager from "../../managers/GameObjectsManager";
import SIOManager from "../../managers/SIOManager";
import CheckCollision from "../../modules/Collider/CheckCollision";
import GameObject from "../GameObject";
import { DoItemEvent } from "../MainPlayer/MainPlayer";
import { AnimationComponent } from "../components/AnimationComponent";

import whiteParticles from "../../assets/animations/particles_animation.json";

class BlueCrystalWO extends GameObject {
    id: number;
    clickCollider = { 
        // x: 36,
        // y: 36,
        // width: 46,
        // height: 46,
        x: 0,
        y: 0,
        width: 32,
        height: 41
    };
    animationComponent: AnimationComponent;

    constructor (id?: number) {
        super();
        this.id = id?id: Math.random() * 100000;
        this.posX = 200;
        this.posY = 200;

        this.animationComponent = new AnimationComponent();
        this.animationComponent.linkAnimation(whiteParticles);
        this.animationComponent.setAnimation("WHITE_PARTICLES");

        this.animationComponent.drawSize.width = 32;
        this.animationComponent.drawSize.height = 41;
    }

    selfOnClick(): void {
    }

    draw (dt: number) {
        const ctx = CanvasManager.ctx;

        const sprite = AssetsManager.sprites["blue-crystal"];

        if (!sprite)
            return;

        const drawPosition = GameObjectsManager.camera.doPosition(this.posX, this.posY, 32, 41);

        this.animationComponent.drawPosition.x = drawPosition.x;
        this.animationComponent.drawPosition.y = drawPosition.y;

        ctx.drawImage(sprite.image, drawPosition.x, drawPosition.y);
        this.animationComponent.draw(dt);
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
            width: 32,
            height: 41
        };
    }
}

export default BlueCrystalWO;