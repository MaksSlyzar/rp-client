class GameObject {
    posX: number;
    posY: number;
    width: number;
    height: number;
    id: number;
    type: string;
    imageProps: {
        x: number,
        y: number,
        width: number,
        height: number
    };
    clickCollider: null|{
        x: number,
        y: number,
        width: number,
        height: number
    };
    collider: null|{
        x: number,
        y: number,
        width: number,
        height: number
    };

    constructor () {
        
    }

    draw (dt: number) {};
    selfOnClick () {};
    selfOnRightClick () {};

    getPosWithCollider () {
        if (this.collider == null) {
            console.error("This gameobject haven't collider.");
            return null;
        }

        return {
            x: this.posX + this.collider.x,
            y: this.posY + this.collider.y,
            width: this.collider.width,
            height: this.collider.height
        };
    }
}

export default GameObject;