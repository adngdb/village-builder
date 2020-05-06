import { derived, get, writable } from 'svelte/store';

import villageMap from './villageMap';


const DEMONS = 'faction/DEMONS';
const HUMANS = 'faction/HUMANS';


const EMPTY_TILE = -1;
const DEFAULT_TILE = {
    owner: DEMONS,
    strength: 5,
};
const DEFAULT_VILLAGE = {
    owner: HUMANS,
    map: villageMap.create(),
    resources: null,
};


const MAP_SIZE = 5;
const MAP_STRUCTURE = [
    EMPTY_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, EMPTY_TILE,
    DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE,
    DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE,
    DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE,
    EMPTY_TILE, EMPTY_TILE, DEFAULT_VILLAGE, EMPTY_TILE, EMPTY_TILE,
];


const internalMap = writable(MAP_STRUCTURE);


function reset() {
    internalMap.set(MAP_STRUCTURE);
}


function getHumanVillages() {
    return get(internalMap).filter(t => t.owner === HUMANS);
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


const selectedVillage = writable(MAP_STRUCTURE.indexOf(DEFAULT_VILLAGE));


function getSelectedVillage() {
    return get(internalMap)[get(selectedVillage)];
}


export default {
    subscribe: worldMap.subscribe,
    reset,
    getSelectedVillage,
    getHumanVillages,
    DEMONS,
    HUMANS,
    EMPTY_TILE,
    MAP_SIZE,
};
