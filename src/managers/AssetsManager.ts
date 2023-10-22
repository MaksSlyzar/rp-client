// import stoneOre from "./../assets/stone_ore.png";
// import base from "./../assets/base.png"
// console

interface Sprite {
    [key: string]: {
        image: CanvasImageSource,
        _type: string
    }
}

class AssetsManager {
    sprites: Sprite = {};
    loaded = false;

    constructor () {
        
    }

    loadImages () {
        const spriteNames = [{
            src: "stone_ore.png",
            name: "stone_ore",
            loaded: false
        },
        {
            src: "minebuild.png",
            name: "mine_build",
            loaded: false
        },
        {
            src: "goodclite.png",
            name: "goodclite",
            loaded: false
        },
        {
            src: "badclite.png",
            name: "badclite",
            loaded: false
        },
        {
            src: "housebuild.png",
            name: "house_build"
        },
        {
            src: "wood_wo.png",
            name: "wo_tree"
        },
        {
            src: "under_wood_wo.png",
            name: "wo_tree_under"
        },
        {
            src: "golden_ore.png",
            name: "golden_ore"
        },
        {
            src: "rpg-char.png",
            name: "char"
        },
        {
            src: "grass-sheet.png",
            name: "grass-sheet"
        },
        {
            src: "empty-ability-icon.png",
            name: "empty-ability-icon"
        },
        {
            src: "main-char.png",
            name: "main-char"
        },
        {
            src: "hero-2.png",
            name: "char-2"
        },
        {
            src: "tree-just.png",
            name: "tree-just"
        }].map(spriteName => { return {...spriteName, loaded: false }});

        spriteNames.forEach(sprite => {
            try {
                const image = new Image();
                image.src = require("./../assets/" + sprite.src).default;
                
                image.onload = () => {
                    this.sprites[sprite.name] = {
                        image: image,
                        _type: "image"
                    };

                    sprite.loaded = true;
                    
                    let allLoaded = true;

                    spriteNames.forEach(_sprite => {
                        if (_sprite.loaded == false)
                            allLoaded = false;
                    });

                    if (allLoaded)
                        this.allSpriteLoaded();
                }
            } catch (error) {
                console.log("Sprite loading problem", sprite);
                console.log(error)
            }
        });
    }

    allSpriteLoaded () {
        this.loaded = true;
        console.log("All sprites loaded!");
    }
}


export default new AssetsManager();