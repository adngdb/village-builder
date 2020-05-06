<script>
    import BUILDINGS from '../data/buildings';
    import SOLDIERS from '../data/soldiers';

    import resources from '../stores/resources';
    import villageMap from '../stores/villageMap';

    import BuildingResources from '../BuildingResources.svelte';

    export let tile;
    export let building;

    let selectedSoldierType = Object.keys(building.recruitment)[0];
    $: selectedSoldier = {
        ...SOLDIERS[selectedSoldierType],
        canPayCost: resources.canPayCost(SOLDIERS[selectedSoldierType].cost),
    };

    $: maximumUnits = Math.min(...Object.entries(selectedSoldier.cost).map(
        ([ type, value ]) => Math.floor($resources[type] / value)
    ));

    $: numberOfUnits = Math.min(1, maximumUnits);

    function setMaximumUnits() {
        numberOfUnits = maximumUnits;
    }

    function getSelectFn(type) {
        return () => {
            selectedSoldierType = type;
        };
    }

    function recruit() {
        const soldier = {
            type: selectedSoldierType,
            turnsToRecruit: selectedSoldier.turnsToRecruit,
        };
        for (let i = 0; i < numberOfUnits; i++) {
            resources.payCost(selectedSoldier.cost);
            villageMap.addToBuildingQueue(tile.index, { ...soldier });
        }
    }
</script>

<style>
    .recruitment .soldier-types {
        display: flex;
        justify-content: space-between;
        margin: 2vmin;
    }

    .recruitment .soldier-types li {
        border: 3px solid #ccc;
        border-radius: 0.5vmin;
        cursor: pointer;
        display: inline-block;
        height: 20vmin;
        line-height: 20vmin;
        margin: 1vmin;
        text-align: center;
        width: 20vmin;
    }

    .recruitment .soldier-types li.active {
        background-color: rgb(237, 164, 164);
    }

    .recruitment .soldier-types li:not(.active):hover {
        background-color: rgb(231, 201, 201);
        border-color: rgb(177, 110, 110);
    }

    .recruitment .caracteristics {
        display: flex;
        justify-content: space-around;
        margin: 2vmin 0;
    }

    .recruitment .caracteristics img {
        height: 1em;
        width: 1em;
    }

    .recruitment .controls {
        display: grid;
        grid-template-columns: 1fr 60px auto auto;
        grid-column-gap: 1vmin;
    }

    @media all and (max-width: 460px) {
        .recruitment .controls {
            grid-template-columns: 60px auto auto;
        }
        .recruitment .controls input:first-child {
            grid-column: 1 / 4;
        }
    }
</style>

{ #if tile.level > 0 }
<div class="recruitment">
    <ul class="soldier-types">
        { #each Object.keys(building.recruitment) as recruit }
        <li
            on:click={ getSelectFn(recruit) }
            class:active={ selectedSoldierType === recruit }
        >
            { SOLDIERS[recruit].name }
        </li>
        { /each }
    </ul>
    <div>
        <ul class="caracteristics">
            <li>
                <BuildingResources resources={ selectedSoldier.cost } />
            </li>
            <li>
                { selectedSoldier.strength }
                <img alt="strength" src="img/strength.svg" />
            </li>
            <li>
                { selectedSoldier.foodIntake }
                <img alt="strength" src="img/meal.svg" />
            </li>
            <li>
                { selectedSoldier.turnsToRecruit }
                <img alt="strength" src="img/turn.svg" />
            </li>
        </ul>
        <p class="controls">
            <input
                type="range"
                name="units"
                min="1"
                max={ maximumUnits }
                bind:value={ numberOfUnits }
            />
            <input
                type="number"
                name="units"
                min="1"
                max={ maximumUnits }
                bind:value={ numberOfUnits }
            />
            <button on:click={ setMaximumUnits }>Max</button>
            <button
                on:click={ recruit }
                disabled={ !selectedSoldier.canPayCost }
            >
                Recruit
            </button>
        </p>
    </div>
</div>
{ /if }
{ #if tile.level < building.maxLevel }
<h3>Next Level ({ tile.level + 1 })</h3>
<p>
    Construction cost: <BuildingResources resources={ building.cost[tile.level] } />
</p>
<p>
    Turns to completion: { tile.level + 1 }
</p>
{ /if }
