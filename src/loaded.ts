let loaded = false;
let cbFuncs: [() => void] = [() => { console.log("Window loaded!")}];

function onLoaded (cb: () => void) {
    cbFuncs.push(cb);
}
function isLoaded () {
    return loaded;
}
window.onload = () => { 
    loaded = true; 
    cbFuncs.map(cb => cb());
};

export default {
    isLoaded: isLoaded,
    onLoaded: onLoaded
};