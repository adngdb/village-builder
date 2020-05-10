import { get, writable } from 'svelte/store';


const RESOURCES = [
    {
        key: 'wood',
        name: 'Wood',
    },
    {
        key: 'stone',
        name: 'Stone',
    },
    {
        key: 'iron',
        name: 'Iron',
    },
    {
        key: 'leather',
        name: 'Leather',
    },
    {
        key: 'gemstone',
        name: 'Gemstone',
    },
];


const DEFAULT_RESOURCES = {
    wood: 40,
    stone: 20,
    iron: 20,
    leather: 0,
    gemstone: 0,
};


function create() {
    const resources = writable(DEFAULT_RESOURCES);


    function reset() {
        resources.set(DEFAULT_RESOURCES);
    }


    function gain(type, value) {
        resources.update(res => {
            return {
                ...res,
                [type]: res[type] + value,
            };
        });
    }


    function lose(type, value) {
        resources.update(res => {
            let newValue = res[type] - value;
            if (newValue < 0) {
                newValue = 0;
            }
            return {
                ...res,
                [type]: newValue,
            };
        });
    }


    function canPayCost(cost) {
        const res = get(resources);
        return Object.entries(cost).every(
            ([ type, value ]) => res[type] >= value
        );
    }


    function payCost(cost) {
        return Object.entries(cost).forEach(
            ([ type, value ]) => lose(type, value)
        );
    }

    return {
        subscribe: resources.subscribe,
        reset,
        canPayCost,
        gain,
        lose,
        payCost,
    };
}


export default {
    create,
    RESOURCES,
};
