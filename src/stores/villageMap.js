import { derived, writable } from 'svelte/store';

const EMPTY_TILE = -1;

const MAP_SIZE = 5;
const MAP_STRUCTURE = [
    EMPTY_TILE, '', '', '', EMPTY_TILE,
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', 'G3', '', '',
    EMPTY_TILE, EMPTY_TILE, 'F1', EMPTY_TILE, EMPTY_TILE,
];


const internalMap = writable(MAP_STRUCTURE);


const setTile = (index, value) => {
    internalMap.update(map => {
        if (map[index] === EMPTY_TILE) {
            return map;
        }
        const newMap = [ ...map ];
        newMap[index] = value;
        return newMap;
    });
};


// The internal map is a flat array. To make it easier to render
// the map, we split it here so that it's an array of arrays.
const villageMap = derived(internalMap, ($internalMap) => {
    const map = [];
    let n = 0;
    while (n < $internalMap.length) {
        const chunk = $internalMap.slice(n, n + MAP_SIZE);
        map.push(chunk.map((item, index) => {
            return {
                content: item,
                index: n + index,
            };
        }));
        n += MAP_SIZE;
    }
    return map;
});


export default {
    subscribe: villageMap.subscribe,
    setTile,
    EMPTY_TILE,
    MAP_SIZE,
};
