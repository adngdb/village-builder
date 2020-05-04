import { writable } from 'svelte/store';

const EMPTY = -1;

const MAP_STRUCTURE = [
    [ EMPTY, '', '', '', EMPTY ],
    [ '', '', '', '', '' ],
    [ '', '', '', '', '' ],
    [ '', '', 'G3', '', '' ],
    [ EMPTY, EMPTY, 'F1', EMPTY, EMPTY ],
];

const villageMap = writable(MAP_STRUCTURE);

export default {
    ...villageMap,
    EMPTY,
};
