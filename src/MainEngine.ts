import Camera from "./gameObjects/Camera";
import AssetsManager from "./managers/AssetsManager";
import CanvasManager from "./managers/CanvasManager";
import GameObjectsManager from "./managers/GameObjectsManager";
import SIOManager from "./managers/SIOManager";

import "./styles/main.scss";

class MainEngine {
    camera: Camera;

    constructor () {
        AssetsManager.loadImages();
        this.update();
        SIOManager.connect({
            connect: () => {
                console.log("Connection!");
            }
        });

        GameObjectsManager.draw();
        CanvasManager.clear();

        this.loadAbilities();

    }

    loadAbilities () {
        const abilityDivs = document.getElementsByClassName("ability");

        for (let divIndex = 0; divIndex < abilityDivs.length; divIndex++) {
            const abilityDiv = abilityDivs[divIndex] as HTMLDivElement;

            abilityDiv.style.backgroundImage = `url(${require("./assets/empty-ability-icon.png").default})`;
            console.log(require("./assets/empty-ability-icon.png").default)
        }

        const showInventoryDiv = document.getElementsByClassName("show-inventory-button")[0] as HTMLDivElement;
        const showAbilityTreeDiv = document.getElementsByClassName("show-ability-tree-button")[0] as HTMLDivElement;
        const hpBarDiv = document.getElementsByClassName("hp-bar")[0] as HTMLDivElement;
        
        showInventoryDiv.style.backgroundImage = `url(${require("./assets/show-inventory-icon.png").default})`;
        showAbilityTreeDiv.style.backgroundImage = `url(${require("./assets/show-ability-tree.png").default})`;
        hpBarDiv.style.backgroundImage = `url(${require("./assets/hp-bar.png").default})`;
    }

    update () {
        CanvasManager.ctx.clearRect(0, 0, CanvasManager.canvas.width, CanvasManager.canvas.height);
        GameObjectsManager.draw();

        setTimeout(() => this.update(), 10);
    }
}

export default MainEngine;