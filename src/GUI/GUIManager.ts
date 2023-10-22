import InventoryController from "./controllers/InventoryController";
import RenderingInfoController from "./controllers/RenderingInfoController";

class GUIManager {
    inventoryController: InventoryController;
    renderingInfo: RenderingInfoController;

    constructor () {
        this.inventoryController = new InventoryController();
        this.renderingInfo = new RenderingInfoController();
    }   

    load () {
        console.log("GUI manager loaded.");
    }
}

export default new GUIManager();