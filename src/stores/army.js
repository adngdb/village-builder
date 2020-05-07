import { get, writable } from 'svelte/store';

import SOLDIERS from '../data/soldiers';


const DEFAULT_SOLDIERS = {
    [SOLDIERS.TYPES.INFANTRY]: 5,
};


const army = writable(DEFAULT_SOLDIERS);


let diedOfStarvationLastTurn = 0;


function reset() {
    army.set(DEFAULT_SOLDIERS);
    diedOfStarvationLastTurn = 0;
}


function getStrength() {
    const soldiers = get(army);
    return Object.keys(soldiers).reduce(
        (s, t) => s + (soldiers[t] * SOLDIERS[t].strength),
        0
    );
}


function getFoodIntake() {
    const soldiers = get(army);
    return Object.keys(soldiers).reduce(
        (food, type) => food + (soldiers[type] * SOLDIERS[type].foodIntake),
        0
    );
}


function getRandomNonZeroSoldierType(soldiers) {
    const types = Object.keys(soldiers).filter(t => soldiers[t] > 0);
    return types[Math.floor(Math.random() * types.length)];
}


function starvation() {
    diedOfStarvationLastTurn++;

    army.update(soldiers => {
        // We can't kill more soldiers than we have, make sure we don't.
        const totalSoldiers = Object.keys(soldiers).reduce(
            (count, type) => count + soldiers[type],
            0
        );
        const soldiersToKill = Math.min(diedOfStarvationLastTurn, totalSoldiers);

        const newArmy = { ...soldiers };

        // DIE, SOLDIERS, DIE!
        for (let i = 0; i < soldiersToKill; i++) {
            // Choose a type of soldier at random.
            const type = getRandomNonZeroSoldierType(newArmy);
            // Kill one of those.
            newArmy[type]--;
        }

        return newArmy;
    });
}


function belliesFilled() {
    diedOfStarvationLastTurn = 0;
}


function loseSoldiers(percent) {
    army.update(soldiers => {
        const totalSoldiers = Object.keys(soldiers).reduce(
            (count, type) => count + soldiers[type],
            0
        );
        const soldiersToKill = Math.round(totalSoldiers * percent / 100);

        const newArmy = { ...soldiers };

        // DIE, SOLDIERS, DIE!
        for (let i = 0; i < soldiersToKill; i++) {
            // Choose a type of soldier at random.
            const type = getRandomNonZeroSoldierType(newArmy);
            // Kill one of those.
            newArmy[type]--;
        }

        return newArmy;
    });
}


function recruit(recruits) {
    army.update(soldiers => {
        const newArmy = { ...soldiers };
        recruits.forEach(type => {
            if (!newArmy[type]) {
                newArmy[type] = 0;
            }
            newArmy[type]++;
        });
        return newArmy;
    });
}


export default {
    ...army,
    reset,
    belliesFilled,
    getFoodIntake,
    getStrength,
    loseSoldiers,
    recruit,
    starvation,
};
