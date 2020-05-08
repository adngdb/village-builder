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
        maxLevel: 10,
        output: {
            1: { food: 10 },
            2: { food: 20 },
            3: { food: 40 },
            4: { food: 80 },
            5: { food: 160 },
            6: { food: 320 },
            7: { food: 640 },
            8: { food: 1000 },
            9: { food: 2000 },
            10: { food: 5000 },
        },
        cost: {
            0: { wood: 10 },
            1: { wood: 30 },
            2: { wood: 80 },
            3: { wood: 200 },
            4: { wood: 500 },
            5: { wood: 1200 },
            6: { wood: 3000 },
            7: { wood: 8000 },
            8: { wood: 20000 },
            9: { wood: 50000 },
            10: { wood: 120000 },
        },
    },

    [TYPES.SAWMILL]: {
        category: CATEGORIES.PRODUCTION,
        name: 'Sawmill',
        illus: 'sawmill',
        maxLevel: 10,
        output: {
            1: { wood: 10 },
            2: { wood: 20 },
            3: { wood: 40 },
            4: { wood: 80 },
            5: { wood: 160 },
            6: { wood: 320 },
            7: { wood: 640 },
            8: { wood: 1000 },
            9: { wood: 2000 },
            10: { wood: 5000 },
        },
        cost: {
            0: { wood: 10, stone: 5, iron: 5 },
            1: { wood: 30, stone: 10, iron: 10 },
            2: { wood: 80, stone: 20, iron: 20 },
            3: { wood: 200, stone: 40, iron: 40 },
            4: { wood: 500, stone: 60, iron: 60 },
            5: { wood: 1200, stone: 100, iron: 100 },
            6: { wood: 3000, stone: 200, iron: 200 },
            7: { wood: 8000, stone: 500, iron: 500 },
            8: { wood: 20000, stone: 1000, iron: 1000 },
            9: { wood: 50000, stone: 3000, iron: 3000 },
            10: { wood: 120000, stone: 10000, iron: 10000 },
        },
    },

    [TYPES.QUARRY]: {
        category: CATEGORIES.PRODUCTION,
        name: 'Quarry',
        illus: 'quarry',
        maxLevel: 10,
        output: {
            1: { stone: 10 },
            2: { stone: 20 },
            3: { stone: 40 },
            4: { stone: 80 },
            5: { stone: 160 },
            6: { stone: 320 },
            7: { stone: 640 },
            8: { stone: 1000 },
            9: { stone: 2000 },
            10: { stone: 5000 },
        },
        cost: {
            0: { wood: 10 },
            1: { wood: 30 },
            2: { wood: 80 },
            3: { wood: 200 },
            4: { wood: 500 },
            5: { wood: 1200 },
            6: { wood: 3000 },
            7: { wood: 8000 },
            8: { wood: 20000 },
            9: { wood: 50000 },
            10: { wood: 120000 },
        },
    },

    [TYPES.MINE]: {
        category: CATEGORIES.PRODUCTION,
        name: 'Mine',
        illus: 'mine',
        maxLevel: 10,
        output: {
            1: { iron: 10 },
            2: { iron: 20 },
            3: { iron: 40 },
            4: { iron: 80 },
            5: { iron: 160 },
            6: { iron: 320 },
            7: { iron: 640 },
            8: { iron: 1000 },
            9: { iron: 2000 },
            10: { iron: 5000 },
        },
        cost: {
            0: { wood: 10 },
            1: { wood: 30 },
            2: { wood: 80 },
            3: { wood: 200 },
            4: { wood: 500 },
            5: { wood: 1200 },
            6: { wood: 3000 },
            7: { wood: 8000 },
            8: { wood: 20000 },
            9: { wood: 50000 },
            10: { wood: 120000 },
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
            10: { wood: 600, stone: 1000 },
        },
    },
};
