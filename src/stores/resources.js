import { get, writable } from 'svelte/store';


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


const resources = writable(DEFAULT_RESOURCES);


function gain(type, value) {
    resources.update(res => {
        return {
            ...res,
            [type]: res[type] + value,
        };
    });
}


function lose(type, value) {
    gain(type, -value);
}


function canPayCost(cost) {
    const res = get(resources);
    return Object.entries(cost).every(
        ([ type, value ]) => res[type] >= value
    );
}


function payCost(cost) {
    return Object.entries(cost).every(
        ([ type, value ]) => lose(type, value)
    );
}


export default {
    subscribe: resources.subscribe,
    canPayCost,
    gain,
    lose,
    payCost,
    RESOURCES,
};
