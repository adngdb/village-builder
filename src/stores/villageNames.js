import { get, writable } from 'svelte/store';


const VILLAGE_NAMES = [
    'Colkirk',
    'Pernrith',
    'Saxondale',
    'Hullbeck',
    'Fallkirk',
    'Old Ashton',
    'Holbeck',
    'Saxondale',
    'Marnmouth',
    'Helmfirth',
    'Aerilon',
    'Monmouth',
    'Armagh',
    'Culcheth',
    'Laenteglos',
    'Ferndochty',
    'Pontypridd',
    'Durnatel',
    'Rachdale',
    'Peltragow',
];


const villageNames = writable(VILLAGE_NAMES);


function reset() {
    villageNames.set(VILLAGE_NAMES);
}


function getVillageName() {
    const names = get(villageNames);
    const name = names[Math.floor(Math.random() * names.length)];

    // Remove the chosen name from the list.
    villageNames.update(n => n.filter(i => i !== name));

    return name;
}


export default {
    subscribe: villageNames.subscribe,
    reset,
    getVillageName,
};
