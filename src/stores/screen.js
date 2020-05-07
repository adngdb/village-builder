import { writable } from 'svelte/store';


const WORLD = 'screens/WORLD';
const VILLAGE = 'screens/VILLAGE';
const ARMY = 'screens/ARMY';


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


function goToArmy() {
    screen.set(ARMY);
}


export default {
    subscribe: screen.subscribe,
    reset,
    goToArmy,
    goToVillage,
    goToWorld,
    ARMY,
    VILLAGE,
    WORLD,
};
