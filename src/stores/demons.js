import { get, writable } from 'svelte/store';

import turn from '../stores/turn';


const TURNS_BETWEEN_ATTACKS = 3;


function getStrength(x) {
    return Math.round(x + Math.cos(x));
}


const demons = writable(getStrength(1));


function getNextAttackTurn() {
    const currentTurn = get(turn);
    return Math.ceil(currentTurn / TURNS_BETWEEN_ATTACKS) * TURNS_BETWEEN_ATTACKS;
}


function computeNextStrength() {
    demons.update(d => getStrength(getNextAttackTurn()));
}


function areAttackingThisTurn() {
    return get(turn) === getNextAttackTurn();
}


export default {
    subscribe: demons.subscribe,
    areAttackingThisTurn,
    computeNextStrength,
    getNextAttackTurn,
};
