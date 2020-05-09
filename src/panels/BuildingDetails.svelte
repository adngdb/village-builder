<script>
    import { createEventDispatcher } from 'svelte';

    import BUILDINGS from '../data/buildings';
    import worldMap from '../stores/worldMap';

    import BuildingResources from '../tools/BuildingResources.svelte';

    import MilitaryBuildingDetails from './MilitaryBuildingDetails.svelte';
    import ProductionBuildingDetails from './ProductionBuildingDetails.svelte';

    export let tileIndex;

    $: village = worldMap.getSelectedVillage().map;
    $: villageResources = worldMap.getSelectedVillage().resources;

    $: tile = {
        ...$village.flat()[tileIndex],
        index: tileIndex,
    };
    $: building = BUILDINGS[tile.building];

    const dispatch = createEventDispatcher();

    function cancel() {
        dispatch('cancel');
    }

    function upgradeBuilding() {
        const cost = building.cost[tile.level];
        if (villageResources.canPayCost(cost)) {
            villageResources.payCost(cost);
            village.upgradeBuilding(tileIndex);
            cancel();
        }
    }
</script>

<style>
    section {
        display: grid;
        height: 100%;
        position: absolute;
        z-index: 200;
    }
</style>

<section>
    <div class="panel">
        <h2>
            <span on:click={ cancel } class="close">
                <img class="icon" src="img/ui/cancel.svg" alt="" />
            </span>
            { building.name } (level { tile.level })
        </h2>
        { #if tile.isBuilding }
        <p>
            Construction is in progress, <strong>{ tile.turnsToCompletion }</strong> { tile.turnsToCompletion === 1 ? 'turn' : 'turns' } remaining before completion.
        </p>
        { /if }
        { #if building.category === BUILDINGS.CATEGORIES.PRODUCTION }
        <ProductionBuildingDetails
            tile={ tile }
            building={ building }
        />
        { :else if building.category === BUILDINGS.CATEGORIES.MILITARY }
        <MilitaryBuildingDetails
            tile={ tile }
            building={ building }
        />
        { /if }
        <p class="controls">
            <button on:click={ cancel }>
                <img class="icon" src="img/ui/cancel.svg" alt="" />
                Close
            </button>
            { #if !tile.isBuilding && tile.level < building.maxLevel }
            <button
                on:click={ upgradeBuilding }
                disabled={ !villageResources.canPayCost(building.cost[tile.level]) }
            >
                <img class="icon" src="img/upgrade.svg" alt="" />
                Upgrade -
                <BuildingResources resources={ building.cost[tile.level] } />
                { tile.level + 1 }<img class="icon" src="img/turn.svg" alt="turns" />
            </button>
            { /if }
        </p>
    </div>
</section>
