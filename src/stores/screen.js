import { writable } from 'svelte/store';


const WORLD = 'screens/WORLD';
const VILLAGE = 'screens/VILLAGE';


const screen = writable(WORLD);


function reset() {
    goToWorld();
}


function goToWorld() {
    screen.set(WORLD);
}


function goToVillage() {
    screen.set(VILLAGE);
}


export default {
    subscribe: screen.subscribe,
    reset,
    goToVillage,
    goToWorld,
    VILLAGE,
    WORLD,
};
