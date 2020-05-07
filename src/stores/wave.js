import { get, writable } from 'svelte/store';

import turn from '../stores/turn';


const TURNS_BETWEEN_ATTACKS = 5;


function getStrength(x) {
    return Math.round(x + Math.cos(x));
}


const DEFAULT_WAVE = {
    turnsToNext: TURNS_BETWEEN_ATTACKS,
    strength: getStrength(TURNS_BETWEEN_ATTACKS),
};


const wave = writable(DEFAULT_WAVE);


function reset() {
    wave.set(DEFAULT_WAVE);
}


function areAttackingThisTurn() {
    return get(wave).turnsToNext === 0;
}


function startNewWave() {
    wave.update(w => {
        const newWave = { ...w };
        newWave.turnsToNext = TURNS_BETWEEN_ATTACKS;
        newWave.strength = getStrength(get(turn) + newWave.turnsToNext);
        return newWave;
    });
}


function onTurnChange(newTurn) {
    wave.update(w => {
        const newWave = { ...w };

        newWave.turnsToNext = newWave.turnsToNext - 1;
        if (newWave.turnsToNext < 0) {
            newWave.turnsToNext = TURNS_BETWEEN_ATTACKS - 1;
            newWave.strength = getStrength(newTurn + newWave.turnsToNext);
        }

        return newWave;
    });
}

turn.subscribe(onTurnChange);


export default {
    subscribe: wave.subscribe,
    reset,
    areAttackingThisTurn,
    startNewWave,
};
