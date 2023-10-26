import AssetsManager from "../../managers/AssetsManager";
import CanvasManager from "../../managers/CanvasManager";
import Point2D from "../../modules/Point2D";

export interface AnimationData {
    [name: string]: PlayAnimation
}

export interface PlayAnimation {
    assetName: string,
    tileWidth: number,
    tileHeight: number,
    tiles: [
        PlayAnimationTile
    ]
};

export interface PlayAnimationTile { speed: number, x: number, y: number };

export class AnimationComponent {

    animationsData: AnimationData;
    playAnimation: PlayAnimation;
    playAnimationName: string;
    playAnimationTileIndex: number;
    playAnimationTile: PlayAnimationTile;
    renderTimes: number = 0;

    lastFrameTime: number = 0;

    drawPosition: Point2D;
    drawSize: {
        width: number,
        height: number
    };

    constructor () {
        this.drawPosition = new Point2D(0, 0);
        this.drawSize = {
            width: 64,
            height: 64
        };
    }

    linkAnimation (data: any) {
        const animation = data as AnimationData;

        this.animationsData = animation;
    }
    
    nextTile () {
        this.playAnimationTileIndex += 1;

        if (this.playAnimationTileIndex >= this.playAnimation.tiles.length)
            this.playAnimationTileIndex = 0;

        this.playAnimationTile = this.playAnimation.tiles[this.playAnimationTileIndex];

    }

    setAnimation (animation_name: string) {
        if (this.animationsData == undefined)
            return;

        const animation = this.animationsData[animation_name];

        if (animation == undefined)
            return;
        
        this.playAnimation = animation;
        this.playAnimationName = animation_name;

        this.playAnimationTileIndex = 0;
        this.playAnimationTile = this.playAnimation.tiles[this.playAnimationTileIndex];
        // console.log("YES")
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

    update () {

    }
}