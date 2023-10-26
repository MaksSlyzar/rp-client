import { io, Socket } from 'socket.io-client'
import Player from '../gameObjects/Player/Player';
import CanvasManager from './CanvasManager';
import GameObjectsManager from './GameObjectsManager';
import loaded from "../loaded";
import GameObject from '../gameObjects/GameObject';
import TreeWO from '../gameObjects/worldResources/Tree';
import GoldenOreWO from '../gameObjects/worldResources/GoldenOre';
import MainPlayer from '../gameObjects/MainPlayer/MainPlayer';
import Unit from '../gameObjects/units/Unit';
import BlueCrystalWO from '../gameObjects/worldResources/BlueCrystal';


interface events {
    connect?: () => void
}

class SIOManager {
    socket: Socket;
    events: events;
    ping: number = 0;
    pingStartTime: number = -1;

    constructor () {
        console.log("SIO loading.")
        loaded.onLoaded(() => this.checkPing());

        const serverUrls = {
            replit: "rp-server.ezcodingf.repl.co/",
            render: "https://zom-backend.onrender.com/",
            local: "http://localhost:3000",
            network: "http://192.168.0.101:3030"
        };

        this.socket = io(serverUrls.network);

        this.socket.on("connect", () => {
            this.register("Maks");
            console.log("Connection!");
        });

        this.socket.emit("createPlayerEvent");
        

        this.socket.on("updateEvent", (data) => {
            // this.ping++
            // console.log(data);

            CanvasManager.DisplayPing.setPing(Date.now() - this.ping, GameObjectsManager.mainPlayer?.id);
            this.ping = Date.now();

            // console.log(data)
            // console.log(data.ownPlayerData);
            // console.log(data.ownPlayerData.posX - GameObjectsManager.mainPlayer.posX);

            GameObjectsManager.mainPlayer.targetX = data.ownPlayerData.posX;
            GameObjectsManager.mainPlayer.targetY = data.ownPlayerData.posY;

            // GameObjectsManager.movePoint.posX = data.ownPlayerData.posX;
            // GameObjectsManager.movePoint.posY = data.ownPlayerData.posY;

            GameObjectsManager.mainPlayer.targetRotation = data.ownPlayerData.rotation;
            GameObjectsManager.serverRequestTime = this.ping;

            const updateUnits = data.unitsData as Array<Unit>;
            // console.log(updateUnits)
            updateUnits.map(updateUnit => {
                let createUnit = true;

                for (const unit of GameObjectsManager.units) {
                    if (unit.id == updateUnit.id) {
                        createUnit = false;
                        unit.targetX = updateUnit.posX;
                        unit.targetY = updateUnit.posY;
                        // unit.rotation = updateUnit.rotation;
                    }
                }

                if (createUnit) {
                    const newUnit = new Unit();

                    newUnit.posX = updateUnit.posX;
                    newUnit.posY = updateUnit.posY;
                    newUnit.id = updateUnit.id;

                    
                    GameObjectsManager.units.push(newUnit);
                }
            });

            const updatePlayers = data.playersData as Array<Player>;
            const updatedPlayersIds: Array<number> = [];
            // console.log(data)

            updatePlayers.map(updatePlayer => {
                let createPlayer = true;
                
                GameObjectsManager.players.map(player => {
                    if (updatePlayer.id == player.id) {
                        createPlayer = false;
                        player.networkData(updatePlayer);
                        updatedPlayersIds.push(player.id);
                    }
                });

                if (createPlayer) {
                    const newPlayer = new Player();
                    
                    newPlayer.posX = updatePlayer.posX;
                    newPlayer.posY = updatePlayer.posY;
                    newPlayer.id = updatePlayer.id;

                    GameObjectsManager.players.push(newPlayer);

                    updatedPlayersIds.push(newPlayer.id);
                }
            });

            GameObjectsManager.players.map(player => {
                if (!updatedPlayersIds.includes(player.id)) {
                    //disconnect
                    GameObjectsManager.removePlayerById(player.id);
                }
            })

            const updateWorldObjects = data.worldObjectsData as Array<GameObject>;
            updateWorldObjects.map(updateWO => {
                let createObject = true;

                GameObjectsManager.worldObjects.map(wo => {
                    if (wo.id == updateWO.id) {
                        createObject = false;
                        wo.posX = updateWO.posX;
                        wo.posY = updateWO.posY;
                    }
                });
                

                if (createObject) {
                    let newObject;

                    switch (updateWO.type) {
                        case "Tree":
                            newObject = new TreeWO(updateWO.id);
                            break;

                        case "GoldenOre":
                            newObject = new GoldenOreWO(updateWO.id);
                        break;

                        case "BlueCrystal":
                            newObject = new BlueCrystalWO(updateWO.id);
                        break;

                        default:
                            return;
                    };

                    newObject.posX = updateWO.posX;
                    newObject.posY = updateWO.posY;

                    GameObjectsManager.worldObjects.push(newObject);
                }
            });

            // console.log(data.ownPlayerData);

            // GameObjectsManager.mainPlayer.setPos(data.posX, data.posY);
        });
    
    }

    checkPing () {
        // CanvasManager.DisplayPing.setPing(this.ping, GameObjectsManager.mainPlayer?.id);
        // this.ping = Date.now();
        // setTimeout(() => this.checkPing(), 1000);
    }

    connect (callbackEvents: events) {
        console.log("Connect...");
        this.events = callbackEvents;
    }

    register (username: string) {
        this.socket.emit("register", {
            username: username
        });

        this.socket.on("playerCreated", (data) => {
            console.log(data);
            GameObjectsManager.mainPlayer = new MainPlayer();

            GameObjectsManager.mainPlayer.id = data.id;
            // console.log(data.posX);
            GameObjectsManager.mainPlayer.setPos(data.posX, data.posY);
        })
    }
}

export default new SIOManager();