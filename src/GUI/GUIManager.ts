import InventoryController from "./controllers/InventoryController";

class GUIManager {
    inventoryController: InventoryController;

    constructor () {
        this.inventoryController = new InventoryController();
    }   

    load () {
        console.log("GUI manager loaded.");
    }
}

export default new GUIManager();