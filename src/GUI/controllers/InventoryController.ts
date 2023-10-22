const sotaPng = require("../../assets/sota-empty.png").default;
const goldenOre = require("../../assets/golden_ore.png").default;

class InventoryController {
    slots: number = 80;

    constructor () { 
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
    }
}

export default InventoryController;