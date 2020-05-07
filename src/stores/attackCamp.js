import { get, writable } from 'svelte/store';


const attackCamp = writable(null);


function reset() {
    attackCamp.set(null);
}


export default {
    ...attackCamp,
    reset,
};
