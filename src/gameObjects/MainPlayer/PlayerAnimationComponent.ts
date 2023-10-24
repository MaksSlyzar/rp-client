import { AnimationComponent } from "../components/AnimationComponent";
import MainPlayer from "./MainPlayer";

import player_animation from "../../assets/animations/player/move_animation.json";
import Point2D from "../../modules/Point2D";
import CanvasManager from "../../managers/CanvasManager";
import AssetsManager from "../../managers/AssetsManager";


class PlayerAnimationComponent extends AnimationComponent<MainPlayer> {
    constructor (playerObject: MainPlayer) {
        super(playerObject);

        this.linkAnimation(player_animation);
    }

    draw (dt: number) {
        const currentTime = Date.now();
        this.renderTimes += dt;

        if (this.playAnimation == undefined)
            return;

        const image = AssetsManager.sprites[this.playAnimation.assetName].image;

        CanvasManager.ctx.drawImage(image, this.playAnimationTile.x, this.playAnimationTile.y, this.playAnimation.tileWidth, this.playAnimation.tileHeight, this.drawPosition.x, this.drawPosition.y, this.playAnimation.tileWidth, this.playAnimation.tileHeight);

        if ((currentTime - this.lastFrameTime) > this.playAnimationTile.speed) {
            this.nextTile();
            this.lastFrameTime = currentTime;
        }
    }

    update(): void {
        
    }
}

export default PlayerAnimationComponent;