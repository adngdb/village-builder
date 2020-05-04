const TYPES = {
    FARM: 'buildings/FARM',
    SAWMILL: 'buildings/SAWMILL',
    QUARRY: 'buildings/QUARRY',
};


export default {
    TYPES,

    [TYPES.FARM]: {
        name: 'Farm',
        maxLevel: 5,
        output: {
            1: { food: 5 },
            2: { food: 10 },
            3: { food: 20 },
            4: { food: 50 },
            5: { food: 100 },
        },
        cost: {
            0: { wood: 10 },
            1: { wood: 30 },
            2: { wood: 80 },
            3: { wood: 200 },
            4: { wood: 500 },
            5: { wood: 1000 },
        },
    },

    [TYPES.SAWMILL]: {
        name: 'Sawmill',
        maxLevel: 5,
        output: {
            1: { wood: 5 },
            2: { wood: 10 },
            3: { wood: 20 },
            4: { wood: 50 },
            5: { wood: 100 },
        },
        cost: {
            0: { wood: 10 },
            1: { wood: 30 },
            2: { wood: 80 },
            3: { wood: 200 },
            4: { wood: 500 },
            5: { wood: 1000 },
        },
    },

    [TYPES.QUARRY]: {
        name: 'Quarry',
        maxLevel: 5,
        output: {
            1: { stone: 5 },
            2: { stone: 10 },
            3: { stone: 20 },
            4: { stone: 50 },
            5: { stone: 100 },
        },
        cost: {
            0: { wood: 10 },
            1: { wood: 30 },
            2: { wood: 80 },
            3: { wood: 200 },
            4: { wood: 500 },
            5: { wood: 1000 },
        },
    },
};
