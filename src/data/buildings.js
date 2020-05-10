import SOLDIERS from './soldiers';


const TYPES = {
    FARM: 'buildings/FARM',
    SAWMILL: 'buildings/SAWMILL',
    QUARRY: 'buildings/QUARRY',
    IRON_MINE: 'buildings/IRON_MINE',
    BARRACKS: 'buildings/BARRACKS',
    HUNTING_CABIN: 'buildings/HUNTING_CABIN',
    GEMSTONE_MINE: 'buildings/GEMSTONE_MINE',
    STABLE: 'buildings/STABLE',
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

    [TYPES.IRON_MINE]: {
        category: CATEGORIES.PRODUCTION,
        name: 'Iron Mine',
        illus: 'iron-mine',
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

    [TYPES.HUNTING_CABIN]: {
        category: CATEGORIES.PRODUCTION,
        name: 'Hunting Cabin',
        illus: 'hunting-cabin',
        maxLevel: 3,
        output: {
            1: { leather: 5, food: 5 },
            2: { leather: 10, food: 10 },
            3: { leather: 20, food: 20 },
        },
        cost: {
            0: { wood: 10, stone: 10, iron: 5 },
            1: { wood: 30, stone: 30, iron: 15 },
            2: { wood: 60, stone: 80, iron: 40 },
        },
    },

    [TYPES.GEMSTONE_MINE]: {
        category: CATEGORIES.PRODUCTION,
        name: 'Gemstone Mine',
        illus: 'gemstone-mine',
        maxLevel: 3,
        output: {
            1: { gemstone: 2 },
            2: { gemstone: 5 },
            3: { gemstone: 10 },
        },
        cost: {
            0: { wood: 10, stone: 5, iron: 10 },
            1: { wood: 30, stone: 15, iron: 30 },
            2: { wood: 60, stone: 40, iron: 80 },
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

    [TYPES.STABLE]: {
        category: CATEGORIES.MILITARY,
        name: 'Stable',
        illus: 'stable',
        maxLevel: 10,
        recruitment: {
            [SOLDIERS.TYPES.CAVALRY]: 1,
            [SOLDIERS.TYPES.CHARIOT]: 3,
            [SOLDIERS.TYPES.KNIGHT]: 6,
            [SOLDIERS.TYPES.CENTAUR]: 10,
        },
        cost: {
            0: { wood: 20, stone: 10, iron: 10 },
            1: { wood: 30, stone: 15, iron: 15 },
            2: { wood: 50, stone: 25, iron: 25 },
            3: { wood: 80, stone: 40, iron: 40 },
            4: { wood: 120, stone: 60, iron: 60 },
            5: { wood: 180, stone: 110, iron: 110 },
            6: { wood: 250, stone: 140, iron: 140 },
            7: { wood: 350, stone: 200, iron: 200 },
            8: { wood: 500, stone: 280, iron: 280 },
            9: { wood: 700, stone: 400, iron: 400 },
        },
    },
};
