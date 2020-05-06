<script>
    import BUILDINGS from '../data/buildings';
    import SOLDIERS from '../data/soldiers';

    import resources from '../stores/resources';
    import worldMap from '../stores/worldMap';

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

    $: village = worldMap.getSelectedVillage().map;

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
            village.addToBuildingQueue(tile.index, { ...soldier });
        }
    }

    const soldiersInQueue = {};
    $: Object.keys(building.recruitment).forEach(recruit => {
        soldiersInQueue[recruit] = tile.queue.filter(i => i.type === recruit).length;
    });
</script>

<style>
    .recruitment .soldier-types {
        margin: 2vmin;
    }

    .recruitment .soldier-types li {
        border: 3px solid #ccc;
        cursor: pointer;
        display: inline-block;
        height: 20vmin;
        position: relative;
        text-align: center;
        width: 20vmin;
    }

    .recruitment .soldier-types li hr {
        width: 80%;
        margin: 0 auto;
    }

    .recruitment .soldier-types li + li {
        margin-left: 1vmin;
    }

    .recruitment .soldier-types li .name {
        font-weight: bold;
    }

    .recruitment .soldier-types li .queue,
    .recruitment .soldier-types li .unlock {
        background-color: rgba(128, 128, 128, 0.5);
        bottom: 0;
        box-shadow: 0 -2px 1px rgb(128, 128, 128);
        padding: 1vmin 0;
        position: absolute;
        width: 100%;
    }

    .recruitment .soldier-types li.active {
        background-color: rgb(237, 164, 164);
    }

    .recruitment .soldier-types li.locked {
        background-image: url(../img/locked.svg);
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
            class:locked={ tile.level < building.recruitment[recruit] }
        >
            <h3 class="name">{ SOLDIERS[recruit].name }</h3>
            <hr />
            { #if tile.level < building.recruitment[recruit] }
            <div class="unlock">Unlock at level { building.recruitment[recruit] }</div>
            { :else if soldiersInQueue[recruit] }
            <div class="queue">In queue: { soldiersInQueue[recruit] }</div>
            { /if }
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
                disabled={
                    !selectedSoldier.canPayCost
                    || tile.level < building.recruitment[selectedSoldierType]
                }
            >
                Recruit
            </button>
        </p>
    </div>
    <p>
        { #if tile.queue.length }
            Currently training: <strong>{ SOLDIERS[tile.queue[0].type].name }</strong>
            <strong>{ tile.queue[0].turnsToRecruit }</strong>
            <img class="icon" alt="turns" src="img/turn.svg" />
        { :else }
            <em>Queue is empty</em>
        { /if }
    </p>
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
