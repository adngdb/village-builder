<script>
    import BUILDINGS from '../data/buildings';
    import SOLDIERS from '../data/soldiers';

    import resources from '../stores/resources';

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

    function recruit() {}
</script>

<style>
    .recruitment .soldier-types li {
        border: 1px solid #ccc;
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
        box-shadow: 0 0 1vmin red;
    }

    .recruitment .caracteristics {
        display: flex;
        justify-content: space-around;
    }

    .recruitment .controls {
        display: grid;
        grid-template-columns: 1fr 60px auto auto;
		grid-column-gap: 1vmin;
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
        <p class="caracteristics">
            <BuildingResources resources={ selectedSoldier.cost } />
            <span>{ selectedSoldier.strength }</span>
            <span>{ selectedSoldier.foodIntake }</span>
            <span>{ selectedSoldier.turnsToRecruit }</span>
        </p>
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
