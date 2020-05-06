import { derived, writable } from 'svelte/store';

const EMPTY_TILE = -1;
const DEFAULT_TILE = {
    building: null,
    level: 0,
    isBuilding: false,
    turnsToCompletion: 0,
};

const MAP_SIZE = 5;
const MAP_STRUCTURE = [
    EMPTY_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, EMPTY_TILE,
    DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE,
    DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE,
    DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE, DEFAULT_TILE,
    EMPTY_TILE, EMPTY_TILE, DEFAULT_TILE, EMPTY_TILE, EMPTY_TILE,
];


const internalMap = writable(MAP_STRUCTURE);


function reset() {
    internalMap.set(MAP_STRUCTURE);
}


function createBuilding(index, buildingType) {
    internalMap.update(map => {
        if (map[index] === EMPTY_TILE || map[index].building) {
            return map;
        }
        const newMap = [ ...map ];
        newMap[index] = {
            ...newMap[index],
            building: buildingType,
            isBuilding: true,
            turnsToCompletion: 1,
            queue: [],
        };
        return newMap;
    });
};


function upgradeBuilding(index) {
    internalMap.update(map => {
        if (map[index] === EMPTY_TILE || !map[index].building) {
            return map;
        }
        const newMap = [ ...map ];
        newMap[index] = {
            ...newMap[index],
            isBuilding: true,
            turnsToCompletion: newMap[index].level + 1,
        };
        return newMap;
    });
};


function build() {
    internalMap.update(map => {
        return map.map(tile => {
            if (tile === EMPTY_TILE || !tile.isBuilding) {
                return tile;
            }

            const newTile = { ...tile };
            newTile.turnsToCompletion--;
            if (newTile.turnsToCompletion === 0) {
                newTile.isBuilding = false;
                newTile.level++;
            }

            return newTile;
        });
    });
};


function addToBuildingQueue(index, item) {
    internalMap.update(map => {
        if (map[index] === EMPTY_TILE || !map[index].building) {
            return map;
        }
        const newMap = [ ...map ];
        newMap[index] = {
            ...newMap[index],
            queue: [ ...newMap[index].queue, item ],
        };
        return newMap;
    });
}


function recruit() {
    const soldiersToRecruit = [];
    internalMap.update(map => {
        return map.map(tile => {
            if (tile === EMPTY_TILE || !tile.building || !tile.queue.length) {
                return tile;
            }

            const queue = [ ...tile.queue ];
            const nextItem = queue.shift();
            nextItem.turnsToRecruit--;

            if (nextItem.turnsToRecruit > 0) {
                queue.unshift(nextItem);
            }
            else {
                soldiersToRecruit.push(nextItem.type);
            }

            console.debug(queue);

            return {
                ...tile,
                queue,
            };
        });
    });
    return soldiersToRecruit;
}


// The internal map is a flat array. To make it easier to render
// the map, we split it here so that it's an array of arrays.
const villageMap = derived(internalMap, ($internalMap) => {
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
    subscribe: villageMap.subscribe,
    reset,
    addToBuildingQueue,
    build,
    createBuilding,
    recruit,
    upgradeBuilding,
    EMPTY_TILE,
    MAP_SIZE,
};
