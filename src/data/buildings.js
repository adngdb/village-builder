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
        illus: 'farm',
        maxLevel: 3,
        output: {
            1: { food: 5 },
            2: { food: 10 },
            3: { food: 20 },
        },
        cost: {
            0: { wood: 10 },
            1: { wood: 30 },
            2: { wood: 80 },
        },
    },

    [TYPES.SAWMILL]: {
        category: CATEGORIES.PRODUCTION,
        name: 'Sawmill',
        illus: 'sawmill',
        maxLevel: 3,
        output: {
            1: { wood: 5 },
            2: { wood: 10 },
            3: { wood: 20 },
        },
        cost: {
            0: { wood: 10 },
            1: { wood: 30, iron: 10 },
            2: { wood: 50, stone: 40, iron: 20 },
        },
    },

    [TYPES.QUARRY]: {
        category: CATEGORIES.PRODUCTION,
        name: 'Quarry',
        illus: 'quarry',
        maxLevel: 3,
        output: {
            1: { stone: 5 },
            2: { stone: 10 },
            3: { stone: 20 },
        },
        cost: {
            0: { wood: 10 },
            1: { wood: 30 },
            2: { wood: 80 },
        },
    },

    [TYPES.MINE]: {
        category: CATEGORIES.PRODUCTION,
        name: 'Mine',
        illus: 'mine',
        maxLevel: 3,
        output: {
            1: { iron: 5 },
            2: { iron: 10 },
            3: { iron: 20 },
        },
        cost: {
            0: { wood: 10 },
            1: { wood: 30 },
            2: { wood: 80 },
        },
    },

    [TYPES.BARRACKS]: {
        category: CATEGORIES.MILITARY,
        name: 'Barracks',
        illus: 'barracks',
        maxLevel: 10,
        recruitment: {
            [SOLDIERS.TYPES.INFANTRY]: 1,
            [SOLDIERS.TYPES.ARCHER]: 3,
            [SOLDIERS.TYPES.HEAVY]: 6,
            [SOLDIERS.TYPES.VETERAN]: 10,
        },
        cost: {
            0: { wood: 10, stone: 20 },
            1: { wood: 15, stone: 30 },
            2: { wood: 25, stone: 50 },
            3: { wood: 40, stone: 80 },
            4: { wood: 60, stone: 120 },
            5: { wood: 110, stone: 180 },
            6: { wood: 140, stone: 250 },
            7: { wood: 200, stone: 350 },
            8: { wood: 280, stone: 500 },
            9: { wood: 400, stone: 700 },
        },
    },
};
