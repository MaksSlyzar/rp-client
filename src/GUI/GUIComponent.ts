interface GUIComponentProps {
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    index: number,
    head: boolean,

};

class GUIComponent  {
    xPos: number;
    yPos: number;
    width: number;
    height: number;
    mainComponent: GUIComponent|null;
    guiComponents: Array<GUIComponent>;
    clickCollider: {
        x: number,
        y: number,
        width: number,
        height: number
    }|null;
 
    onClick (event: Event) {};

    getPos (x: number, y: number) {
        return { 
            xPos: this.xPos + x,
            yPos: this.yPos + y
        }
    }

    draw () {}
    update () {}
    isClick (x: number, y: number) {
        if (this.clickCollider == null)
            return;

        if (x > this.clickCollider.x && x < this.clickCollider.width + this.clickCollider.x) {
            if (y > this.clickCollider.y && y < this.clickCollider.height + this.clickCollider.y) {
                return true;
            }
        } 

        return false;
    }

    updateComponents () {
        this.update();

        if (!this.guiComponents)
            return

        
        this.guiComponents.map(component => {
            // component.draw();
            component.updateComponents();
        });
    }

    drawComponents () {
        this.draw();
        
        if (!this.guiComponents)
            return

        
        this.guiComponents.map(component => {
            // component.update();
            component.drawComponents();
        });
    }
}

export default GUIComponent;