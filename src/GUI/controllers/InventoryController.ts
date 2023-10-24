import CanvasManager from "../../managers/CanvasManager";

const sotaPng = require("../../assets/sota-empty.png").default;
const goldenOre = require("../../assets/golden_ore.png").default;

class InventoryController {
    slots: number = 80;
    inventoryOpen: boolean = false;
    inventoryElement: HTMLDivElement;

    constructor () {
        this.inventoryElement = document.getElementsByClassName("inventory")[0] as HTMLDivElement;
        const inventoryContainer = document.getElementsByClassName("inventory-container")[0] as HTMLDivElement;

        for (let sotaIndex = 0; sotaIndex < this.slots; sotaIndex++) {
            const sota = document.createElement("div");
            const img = document.createElement("img");
            const span = document.createElement("span");

            span.innerHTML = "52";

            img.src = goldenOre;

            sota.id = `sota-${sotaIndex}`;
            sota.className = "sota";
            sota.style.backgroundImage = `url(${sotaPng})`;

            span.className = "sota-count";

            img.className = "sota-img";
            sota.appendChild(img);
            sota.appendChild(span);

            inventoryContainer.appendChild(sota);
        }

        const showInventoryButton = document.getElementById("showInventoryButton") as HTMLButtonElement;

        showInventoryButton.onclick = this.showInventoryClick; 

        CanvasManager.events.setOnKeyUp((keyCode: number) => {
            if (keyCode == 73) //I
                this.showInventoryClick();
        });
    }

    refresh () {
        
    }

    showInventoryClick = () => {
        this.showInventory(!this.inventoryOpen);
    }

    showInventory (show: boolean) {
        this.inventoryOpen = show;

        if (this.inventoryOpen) {
            this.inventoryElement.className = "inventory";
        } else {
            this.inventoryElement.className = "inventory hidden"
        }
    }
}

export default InventoryController;