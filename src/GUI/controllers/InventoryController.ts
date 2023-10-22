class InventoryController {
    slots: number = 20;

    constructor () { 
        const inventoryContainer = document.getElementsByClassName("inventory-conteiner")[0] as HTMLDivElement;

        for (let sotaIndex = 0; sotaIndex < this.slots; sotaIndex++) {
            const sota = document.createElement("div");
            sota.id = `sota-${sotaIndex}`;
            sota.className = "sota";

            inventoryContainer.appendChild(sota);
        }
    }
}

export default InventoryController;