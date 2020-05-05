import { writable } from 'svelte/store';

import SOLDIERS from '../data/soldiers';


const DEFAULT_SOLDIERS = {
    [SOLDIERS.TYPES.INFANTRY]: 5,
};


const army = writable(DEFAULT_SOLDIERS);


export default {
    ...army,
};
