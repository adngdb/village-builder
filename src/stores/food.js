import { get, writable } from 'svelte/store';


const DEFAULT_FOOD = 20;

const food = writable(DEFAULT_FOOD);


function reset() {
    food.set(DEFAULT_FOOD);
}


function gain(value) {
    food.update(f => f + value);
}


function lose(value) {
    food.update(f => {
        let newValue = f - value;
        if (newValue < 0) {
            newValue = 0;
        }
        return newValue;
    });
}


export default {
    subscribe: food.subscribe,
    reset,
    gain,
    lose,
};
