import SOLDIERS from './soldiers';


const TYPES = {
    FARM: 'buildings/FARM',
    SAWMILL: 'buildings/SAWMILL',
    QUARRY: 'buildings/QUARRY',
    MINE: 'buildings/MINE',
    BARRACKS: 'buildings/BARRACKS',
};


const CATEGORIES = {
    PRODUCTION: 'buildings/PRODUCTION',
    MILITARY: 'buildings/MILITARY',
};


export default {
    TYPES,
    CATEGORIES,

    [TYPES.FARM]: {
        category: CATEGORIES.PRODUCTION,
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
        category: CATEGORIES.PRODUCTION,
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
            0: { wood: 10, stone: 5, iron: 5 },
            1: { wood: 30, stone: 10, iron: 10 },
            2: { wood: 80, stone: 20, iron: 20 },
            3: { wood: 200, stone: 40, iron: 40 },
            4: { wood: 500, stone: 60, iron: 60 },
            5: { wood: 1000, stone: 100, iron: 100 },
        },
    },

    [TYPES.QUARRY]: {
        category: CATEGORIES.PRODUCTION,
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
            0: { wood: 20 },
            1: { wood: 40 },
            2: { wood: 120 },
            3: { wood: 300 },
            4: { wood: 800 },
            5: { wood: 2000 },
        },
    },

    [TYPES.MINE]: {
        category: CATEGORIES.PRODUCTION,
        name: 'Mine',
        maxLevel: 5,
        output: {
            1: { iron: 5 },
            2: { iron: 10 },
            3: { iron: 20 },
            4: { iron: 50 },
            5: { iron: 100 },
        },
        cost: {
            0: { wood: 20 },
            1: { wood: 40 },
            2: { wood: 120 },
            3: { wood: 300 },
            4: { wood: 800 },
            5: { wood: 2000 },
        },
    },

    [TYPES.BARRACKS]: {
        category: CATEGORIES.MILITARY,
        name: 'Barracks',
        maxLevel: 3,
        recruitment: {
            [SOLDIERS.TYPES.INFANTRY]: 1,
            [SOLDIERS.TYPES.VETERAN]: 3,
        },
        cost: {
            0: { wood: 10, stone: 20 },
            1: { wood: 15, stone: 30 },
            2: { wood: 25, stone: 50 },
            3: { wood: 40, stone: 80 },
        },
    },
};
