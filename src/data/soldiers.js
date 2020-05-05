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
        turnsToCompletion: 1,
    },

    [TYPES.VETERAN]: {
        name: 'Veteran',
        strength: 3,
        foodIntake: 2,
        turnsToCompletion: 2,
    },
};
