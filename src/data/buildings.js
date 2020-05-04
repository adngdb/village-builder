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
    },
};
