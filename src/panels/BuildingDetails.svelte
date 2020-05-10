<script>
    import { createEventDispatcher } from 'svelte';

    import BUILDINGS from '../data/buildings';
    import worldMap from '../stores/worldMap';

    import BuildingResources from '../tools/BuildingResources.svelte';

    import Panel from './Panel.svelte';
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

    function upgradeBuilding() {
        const cost = building.cost[tile.level];
        if (villageResources.canPayCost(cost)) {
            villageResources.payCost(cost);
            village.upgradeBuilding(tileIndex);
            dispatch('cancel');
        }
    }
</script>

<Panel on:cancel>
    <span slot="title">{ building.name } (level { tile.level })</span>

    { #if tile.isBuilding }
    <p>
        Construction is in progress, <strong>{ tile.turnsToCompletion }</strong>
        <img class="icon" src="img/turn.svg" alt="turns" />
        remaining before completion.
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

    <span slot="control">
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
    </span>
</Panel>
