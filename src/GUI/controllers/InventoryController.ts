class InventoryController {
    slots: number = 40;

    constructor () { 
        const inventoryContainer = document.getElementsByClassName("inventory-container")[0] as HTMLDivElement;

        for (let sotaIndex = 0; sotaIndex < this.slots; sotaIndex++) {
            const sota = document.createElement("span");
            sota.id = `sota-${sotaIndex}`;
            sota.className = "sota";

            inventoryContainer.appendChild(sota);
        }
    }
}

export default InventoryController;