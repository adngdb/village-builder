<script>
    import { createEventDispatcher } from 'svelte';

    import BUILDINGS from '../data/buildings';
    import resources from '../stores/resources';
    import villageMap from '../stores/villageMap';

    import BuildingResources from '../BuildingResources.svelte';

    export let tileIndex;

    $: tile = $villageMap.flat()[tileIndex];
    $: building = BUILDINGS[tile.building];

    const dispatch = createEventDispatcher();

    function cancel() {
        dispatch('cancel');
    }

    function upgradeBuilding() {
        const cost = building.cost[tile.level];
        if (resources.canPayCost(cost)) {
            resources.payCost(cost);
            villageMap.upgradeBuilding(tileIndex);
            cancel();
        }
    }
</script>

<style>
    section {
        position: absolute;
        z-index: 200;
    }

    .panel {
        background-color: white;
        border: 0.1vmin solid black;
        border-radius: 1vmin;
        box-sizing: border-box;
        text-align: left;
    }

    .panel h2 {
        border-bottom: 0.4vmin solid black;
        font-size: 2vmin;
        font-weight: bold;
        margin: 0;
        padding: 1vmin;
        text-align: center;
    }

    .panel h3,
    .panel p {
        margin: 0;
        padding: 1vmin;
    }

    .panel .controls {
        text-align: center;
    }
</style>

<section>
    <div class="panel">
        <h2>{ building.name } (level: { tile.level })</h2>
        { #if tile.isBuilding }
        <p>
            Construction is in progress, <strong>{ tile.turnsToCompletion }</strong> { tile.turnsToCompletion === 1 ? 'turn' : 'turns' } remaining before completion.
        </p>
        { /if }
        { #if tile.level > 0 }
        <p>
            Production per turn: <BuildingResources resources={ building.output[tile.level] } />
        </p>
        { /if }
        { #if tile.level < building.maxLevel }
        <h3>Next Level ({ tile.level + 1 })</h3>
        <p>
            Production per turn: <BuildingResources resources={ building.output[tile.level + 1] } />
        </p>
        <p>
            Construction cost: <BuildingResources resources={ building.cost[tile.level] } />
        </p>
        <p>
            Turns to completion: { tile.level + 1 }
        </p>
        { /if }
        <p class="controls">
            <button on:click={ cancel }>Close</button>
            { #if !tile.isBuilding && tile.level < building.maxLevel }
            <button
                on:click={ upgradeBuilding }
                disabled={ !resources.canPayCost(building.cost[tile.level]) }
            >
                Upgrade to level { tile.level + 1 }
            </button>
            { /if }
        </p>
    </div>
</section>
