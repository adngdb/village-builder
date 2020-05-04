const TYPES = {
    FARM: 'buildings/FARM',
    SAWMILL: 'buildings/SAWMILL',
    QUARRY: 'buildings/QUARRY',
};


export default {
    TYPES,
    [TYPES.FARM]: {
        name: 'Farm',
        levels: {
            1: {
                output: {
                    food: 5,
                },
            },
            2: {
                output: {
                    food: 10,
                },
            },
            3: {
                output: {
                    food: 20,
                },
            },
            4: {
                output: {
                    food: 50,
                },
            },
            5: {
                output: {
                    food: 100,
                },
            },
        },
    },
};
