import { writable } from 'svelte/store';


const report = writable(null);


function reset() {
    report.set(null);
}


function createReport(type, losses, village) {
    report.set({
        type,
        losses,
        village,
    });
}


export default {
    subscribe: report.subscribe,
    reset,
    createReport,
};
