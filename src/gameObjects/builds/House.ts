import GameObject from "../GameObject";

class House extends GameObject{
    id: number;
    rotation: number;
    level: number;
    
    constructor() {
        super();

        this.posX = 0;
        this.posY = 0;
    }

    draw () {

    }

    selfOnClick(): void {
        
    }
}

export default House;