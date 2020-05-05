import { get } from 'svelte/store';

import BUILDINGS from '../data/buildings';
import SOLDIERS from '../data/soldiers';

import army from '../stores/army';
import demons from '../stores/demons';
import resources from '../stores/resources';
import turn from '../stores/turn';
import villageMap from '../stores/villageMap';


function produceResources() {
    const buildings = get(villageMap).flat()
        .filter(t => t !== villageMap.EMPTY_TILE)
        .filter(t => t.building && t.level > 0);

    buildings.forEach(tile => {
        const output = BUILDINGS[tile.building].output[tile.level];
        for (const resource in output) {
            resources.gain(resource, output[resource]);
        }
    });
}


function eatFood() {
    const soldiers = get(army);
    const foodToEat = Object.keys(soldiers).reduce(
        (food, type) => food + (soldiers[type] * SOLDIERS[type].foodIntake),
        0
    );
    resources.lose('food', foodToEat);
}


export default function endTurn() {
    produceResources();
    eatFood();
    villageMap.build();
    // createSoldiers();
    // resolveAttack();
    turn.next();
    demons.computeNextStrength();
}
