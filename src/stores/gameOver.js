import { writable } from 'svelte/store';


const VICTORY = 'gameOver/VICTORY';
const DEFEAT = 'gameOver/DEFEAT';


const gameOver = writable(null);


function reset() {
    gameOver.set(null);
}


function win() {
    gameOver.update(() => VICTORY);
}


function lose() {
    gameOver.update(() => DEFEAT);
}


export default {
    subscribe: gameOver.subscribe,
    reset,
    win,
    lose,
    DEFEAT,
    VICTORY,
};
