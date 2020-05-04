import { get } from 'svelte/store';

import BUILDINGS from '../data/buildings';

import resources from '../stores/resources';
import villageMap from '../stores/villageMap';


function produceResources() {
    const buildings = get(villageMap).flat()
        .filter(t => t !== villageMap.EMPTY_TILE)
        .filter(t => t.building && t.level > 0);

    buildings.forEach(tile => {
        const output = BUILDINGS[tile.building].levels[tile.level].output;
        for (const resource in output) {
            resources.gain(resource, output[resource]);
        }
    });
}


export default function endTurn() {
    produceResources();
    villageMap.build();
}
