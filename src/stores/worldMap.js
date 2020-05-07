import { derived, get, writable } from 'svelte/store';

import resources from './resources';
import villageMap from './villageMap';


const DEMONS = 'faction/DEMONS';
const HUMANS = 'faction/HUMANS';


const EMPTY_TILE = -1;
const DEFAULT_TILE = {
    owner: DEMONS,
    strength: 5,
};


const MAP_SIZE = 5;


function humanVillage() {
    return {
        owner: HUMANS,
        map: villageMap.create(),
        resources: resources.create(),
    };
}

function createWorld() {
    return [
        EMPTY_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, EMPTY_TILE,
        DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE,
        DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE,
        DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE,
        EMPTY_TILE, EMPTY_TILE, humanVillage(), EMPTY_TILE, EMPTY_TILE,
    ];
}


const internalMap = writable(createWorld());


function getHumanVillages() {
    return get(internalMap).filter(t => t.owner === HUMANS);
}


function claimVillage(index) {
    internalMap.update(map => {
        const newMap = [ ...map ];
        newMap[index] = humanVillage();
        return newMap;
    });
}


// The internal map is a flat array. To make it easier to render
// the map, we split it here so that it's an array of arrays.
const worldMap = derived(internalMap, ($internalMap) => {
    const map = [];
    let n = 0;
    while (n < $internalMap.length) {
        const chunk = $internalMap.slice(n, n + MAP_SIZE);
        map.push(chunk.map((item, index) => {
            if (item === EMPTY_TILE) {
                return item;
            }
            return {
                ...item,
                index: n + index,
            };
        }));
        n += MAP_SIZE;
    }
    return map;
});


function getDefaultVillageIndex() {
    return get(internalMap).findIndex(t => t !== EMPTY_TILE && t.owner === HUMANS);
}


const selectedVillage = writable(getDefaultVillageIndex());


function getSelectedVillage() {
    return get(internalMap)[get(selectedVillage)];
}


function setSelectedVillageIndex(index) {
    selectedVillage.set(index);
}


function reset() {
    internalMap.set(createWorld());
    selectedVillage.set(getDefaultVillageIndex());
}


export default {
    subscribe: worldMap.subscribe,
    selectedVillage: selectedVillage,
    reset,
    claimVillage,
    getSelectedVillage,
    getHumanVillages,
    setSelectedVillageIndex,
    DEMONS,
    HUMANS,
    EMPTY_TILE,
    MAP_SIZE,
};
