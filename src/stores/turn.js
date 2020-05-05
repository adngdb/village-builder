import { writable } from 'svelte/store';


const turn = writable(1);


function next() {
    turn.update(t => t + 1);
}


export default {
    subscribe: turn.subscribe,
    next,
};
