import { derived, writable } from 'svelte/store';


const DEMONS = 'faction/DEMONS';
const HUMANS = 'faction/HUMANS';


const EMPTY_TILE = -1;
const DEFAULT_TILE = {
    owner: DEMONS,
    strength: 5,
};
const DEFAULT_VILLAGE = {
    owner: HUMANS,
    village: null,
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


export default {
    subscribe: worldMap.subscribe,
    reset,
    DEMONS,
    HUMANS,
    EMPTY_TILE,
    MAP_SIZE,
};
