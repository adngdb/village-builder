const TYPES = {
    INFANTRY: 'soldiers/INFANTRY',
    ARCHER: 'soldiers/ARCHER',
    HEAVY: 'soldiers/HEAVY',
    VETERAN: 'soldiers/VETERAN',
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
};
