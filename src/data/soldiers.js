const TYPES = {
    INFANTRY: 'soldiers/INFANTRY',
    VETERAN: 'soldiers/VETERAN',
};


export default {
    TYPES,

    [TYPES.INFANTRY]: {
        name: 'Infantry',
        strength: 1,
        foodIntake: 1,
        turnsToRecruit: 1,
        cost: { wood: 5, iron: 5 },
    },

    [TYPES.VETERAN]: {
        name: 'Veteran',
        strength: 3,
        foodIntake: 2,
        turnsToRecruit: 2,
        cost: { wood: 20, iron: 20 },
    },
};
