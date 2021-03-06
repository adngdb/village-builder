import { derived, get, writable } from 'svelte/store';

import resources from './resources';
import villageMap from './villageMap';
import villageNames from './villageNames';


const DEMONS = 'faction/DEMONS';
const HUMANS = 'faction/HUMANS';


const EMPTY_TILE = -1;

const CAMP_SMALL = {
    owner: DEMONS,
    type: 'small',
    strength: 40,
};

const CAMP_MIDDLE = {
    owner: DEMONS,
    type: 'middle',
    strength: 120,
};

const CAMP_BIG = {
    owner: DEMONS,
    type: 'big',
    strength: 600,
};

const CAMP_BOSS = {
    owner: DEMONS,
    type: 'boss',
    strength: 2000,
};


const MAP_SIZE = 5;


function humanVillage(order) {
    if (!order) {
        order = getVillagesCount() + 1;
    }
    return {
        owner: HUMANS,
        map: villageMap.create(),
        resources: resources.create(),
        name: villageNames.getVillageName(),
        order,
    };
}


function createWorld() {
    return [
        EMPTY_TILE, CAMP_BIG, CAMP_BIG, CAMP_BIG, EMPTY_TILE,
        CAMP_MIDDLE, CAMP_BIG, CAMP_BOSS, CAMP_BIG, CAMP_MIDDLE,
        CAMP_MIDDLE, CAMP_MIDDLE, CAMP_BIG, CAMP_MIDDLE, CAMP_MIDDLE,
        CAMP_SMALL, CAMP_SMALL, CAMP_MIDDLE, CAMP_SMALL, CAMP_SMALL,
        EMPTY_TILE, EMPTY_TILE, humanVillage(1), EMPTY_TILE, EMPTY_TILE,
    ];
}


const internalMap = writable(createWorld());


function getHumanVillages() {
    return get(internalMap)
    .map(
        (tile, index) => { return { ...tile, index }; }
    )
    .filter(t => t.owner === HUMANS)
    .sort((a, b) => a.order - b.order);
}


function getVillagesCount() {
    return getHumanVillages().length;
}


function getTile(index) {
    return get(internalMap)[index];
}


function getAdjacentTiles(index) {
    const x = Math.floor(index / MAP_SIZE);
    const y = index - ( x * MAP_SIZE );

    let adjacents;
    if (y % 2 === 0) {
        adjacents =  [
            [ x - 1, y - 1 ],
            [ x - 1, y ],
            [ x - 1, y + 1 ],
            [ x, y - 1 ],
            [ x + 1, y ],
            [ x, y + 1 ],
        ];
    }
    else {
        adjacents =  [
            [ x, y - 1 ],
            [ x - 1, y ],
            [ x, y + 1 ],
            [ x + 1, y - 1 ],
            [ x + 1, y ],
            [ x + 1, y + 1 ],
        ];
    }

    return adjacents.map(([ i, j ]) => {
        if (i < 0 || i >= MAP_SIZE || j < 0 || j >= MAP_SIZE) {
            return null;
        }
        return i * MAP_SIZE + j;
    }).filter(i => i !== null);
}


function isAdjacentToHumanVillage(index) {
    const adjacents = getAdjacentTiles(index);
    const map = get(internalMap);
    return adjacents.some(
        i => {
            return map[i] !== EMPTY_TILE && map[i].owner === HUMANS;
        }
    );
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
    return getHumanVillages()[0].index;
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


function claimVillage(index) {
    internalMap.update(map => {
        const newMap = [ ...map ];
        newMap[index] = humanVillage();
        return newMap;
    });
    setSelectedVillageIndex(index);
}


export default {
    subscribe: worldMap.subscribe,
    selectedVillage: selectedVillage,
    reset,
    claimVillage,
    isAdjacentToHumanVillage,
    getAdjacentTiles,
    getHumanVillages,
    getSelectedVillage,
    getTile,
    getVillagesCount,
    setSelectedVillageIndex,
    DEMONS,
    HUMANS,
    EMPTY_TILE,
    MAP_SIZE,
};
