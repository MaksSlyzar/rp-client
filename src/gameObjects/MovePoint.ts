import GameObject from "./GameObject";

class MovePoint extends GameObject {
    posX = 0;
    posY = 0;
    collider = { 
        x: 0,
        y: 0,
        width: 1,
        height: 1 
    };

    constructor () {
        super();
    }

    update () {

    }

    draw () {
        
    }
}

export default MovePoint;