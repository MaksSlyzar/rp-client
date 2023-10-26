import { AnimationComponent } from "../components/AnimationComponent";
import MainPlayer from "./MainPlayer";

import player_animation from "../../assets/animations/player/move_default_sword.json";
import Point2D from "../../modules/Point2D";
import CanvasManager from "../../managers/CanvasManager";
import AssetsManager from "../../managers/AssetsManager";


class PlayerAnimationComponent {
    moveAnimationComponent: AnimationComponent;
    gameObject: MainPlayer;

    constructor (playerObject: MainPlayer) {
        this.gameObject = playerObject;

        this.moveAnimationComponent = new AnimationComponent();
        this.moveAnimationComponent.linkAnimation(player_animation);
    }

    draw (dt: number) {
        this.moveAnimationComponent.draw(dt);
    }

    setAnimation(name: string) {
        this.moveAnimationComponent.setAnimation(name);
    }

    setDrawSize (width: number, height: number) {
        this.moveAnimationComponent.drawSize.width = width;
        this.moveAnimationComponent.drawSize.height = height;
    }

    setDrawPosition (x: number, y: number) {
        this.moveAnimationComponent.drawPosition.x = x;
        this.moveAnimationComponent.drawPosition.y = y;
    }

    update(): void {
        
    }
}

export default PlayerAnimationComponent;