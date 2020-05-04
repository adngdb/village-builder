import { writable } from 'svelte/store';


const RESOURCES = [
    {
        key: 'food',
        name: 'Food',
    },
    {
        key: 'wood',
        name: 'Wood',
    },
    {
        key: 'stone',
        name: 'Stone',
    },
];


const DEFAULT_RESOURCES = {
    food: 5,
    wood: 10,
    stone: 5,
};


const { subscribe, set, update } = writable(DEFAULT_RESOURCES);


function gain(type, value) {
    update(resources => {
        return {
            ...resources,
            [type]: resources[type] + value,
        };
    });
}


export default {
    subscribe,
    gain,
    RESOURCES,
};
