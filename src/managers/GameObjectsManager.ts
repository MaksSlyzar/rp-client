import Camera from "../gameObjects/Camera";
import GameObject from "../gameObjects/GameObject";
import CanvasView from "./CanvasManager";
import CanvasManager from "./CanvasManager";
import loaded from "../loaded";
import Player from "../gameObjects/Player";
import Marker from "../gameObjects/Marker";
import TreeWO from "../gameObjects/worldResources/Tree";
import MovePoint from "../gameObjects/MovePoint";
import MainPlayer from "../gameObjects/MainPlayer";
import Grid from "../gameObjects/Grid";
import Unit from "../gameObjects/units/Unit";

class GameObjectsManager {
    camera: Camera;
    loaded: boolean = false;
    mainPlayer: MainPlayer;
    players: Array<Player> = [];
    worldObjects: Array<GameObject> = [];
    marker: Marker;
    movePoint: MovePoint;
    showColliders: boolean;
    serverRequestTime: number = 0;
    grid: Grid;
    units: Unit[] = [];

    constructor () {
        if (loaded.isLoaded() == true)
            this.start();

        loaded.onLoaded(() => {
            this.start();
        });
        this.showColliders = true;

        this.mainPlayer = new MainPlayer();
    }

    getWOById (id: number) {
        for (let wo of this.worldObjects) {
            if (wo.id == id) {
                return wo;
            }
        }

        return null;
    }
    
    start () {
        this.camera = new Camera();
        this.marker = new Marker();
        this.grid = new Grid();
        this.movePoint = new MovePoint();


        //Tests
        // const newTree = new TreeWO();
        // this.worldObjects.push(newTree);
    }

    draw () {
        if (loaded.isLoaded() == false)
            return;

        this.grid.draw();

        this.players.map(player => {
            player.update(Date.now() - this.serverRequestTime);
            player.draw();
        });


        if (this.mainPlayer) {
            this.mainPlayer.draw();
            this.mainPlayer.update(Date.now() - this.serverRequestTime);
        }

        this.worldObjects.map(wo => {
            wo.draw();
        });


        this.units.map(unit => {
            unit.update(Date.now() - this.serverRequestTime);
            unit.draw();
        });

        this.camera.update();
        this.marker.draw();
    }
}

export default new GameObjectsManager();