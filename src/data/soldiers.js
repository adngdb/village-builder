const TYPES = {
    INFANTRY: 'soldiers/INFANTRY',
    ARCHER: 'soldiers/ARCHER',
    HEAVY: 'soldiers/HEAVY',
    VETERAN: 'soldiers/VETERAN',
    CAVALRY: 'soldiers/CAVALRY',
    CHARIOT: 'soldiers/CHARIOT',
    KNIGHT: 'soldiers/KNIGHT',
    CENTAUR: 'soldiers/CENTAUR',
};


export default {
    TYPES,

    [TYPES.INFANTRY]: {
        name: 'Infantry',
        illus: 'infantry',
        strength: 1,
        foodIntake: 1,
        turnsToRecruit: 1,
        cost: { wood: 5, iron: 5 },
    },

    [TYPES.ARCHER]: {
        name: 'Archer',
        illus: 'archer',
        strength: 3,
        foodIntake: 2,
        turnsToRecruit: 2,
        cost: { wood: 10, iron: 10 },
    },

    [TYPES.HEAVY]: {
        name: 'Heavy Infantry',
        illus: 'heavy',
        strength: 5,
        foodIntake: 2,
        turnsToRecruit: 3,
        cost: { wood: 10, iron: 30 },
    },

    [TYPES.VETERAN]: {
        name: 'Veteran',
        illus: 'veteran',
        strength: 10,
        foodIntake: 3,
        turnsToRecruit: 3,
        cost: { wood: 40, iron: 40 },
    },

    [TYPES.CAVALRY]: {
        name: 'Cavalry',
        illus: 'cavalry',
        strength: 2,
        foodIntake: 2,
        turnsToRecruit: 1,
        cost: { iron: 10, leather: 10 },
    },

    [TYPES.CHARIOT]: {
        name: 'Chariot',
        illus: 'chariot',
        strength: 5,
        foodIntake: 2,
        turnsToRecruit: 2,
        cost: { wood: 25, iron: 10, leather: 5 },
    },

    [TYPES.KNIGHT]: {
        name: 'Knight',
        illus: 'knight',
        strength: 5,
        foodIntake: 2,
        turnsToRecruit: 3,
        cost: { iron: 40, leather: 30 },
    },

    [TYPES.CENTAUR]: {
        name: 'Centaur',
        illus: 'centaur',
        strength: 8,
        foodIntake: 1,
        turnsToRecruit: 2,
        cost: { wood: 10, iron: 40, gemstone: 15 },
    },
};
