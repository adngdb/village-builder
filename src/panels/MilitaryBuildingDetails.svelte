<script>
    import BUILDINGS from '../data/buildings';
    import SOLDIERS from '../data/soldiers';

    import worldMap from '../stores/worldMap';

    import BuildingResources from '../tools/BuildingResources.svelte';

    export let tile;
    export let building;

    $: village = worldMap.getSelectedVillage().map;
    $: villageResources = worldMap.getSelectedVillage().resources;

    let selectedSoldierType = Object.keys(building.recruitment)[0];
    $: selectedSoldier = {
        ...SOLDIERS[selectedSoldierType],
        canPayCost: villageResources.canPayCost(SOLDIERS[selectedSoldierType].cost),
    };

    $: maximumUnits = Math.min(...Object.entries(selectedSoldier.cost).map(
        ([ type, value ]) => Math.floor($villageResources[type] / value)
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
            villageResources.payCost(selectedSoldier.cost);
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
        display: flex;
        justify-content: space-between;
    }

    .recruitment .soldier-types li {
        border: 3px solid hsl(0, 0%, 70%);
        box-sizing: border-box;
        cursor: pointer;
        display: inline-block;
        height: 20vmin;
        overflow: hidden;
        position: relative;
        text-align: center;
        width: 20vmin;
    }

    .recruitment .soldier-types li hr {
        width: 80%;
        margin: 0 auto;
    }

    .recruitment .soldier-types li .name {
        font-weight: bold;
    }

    .recruitment .soldier-types li .queue,
    .recruitment .soldier-types li .unlock {
        background-color: hsla(0, 0%, 10%, 0.5);
        bottom: 0;
        box-shadow: 0 -2px 1px hsla(0, 0%, 10%, 0.6);
        color: hsl(0, 0%, 90%);
        padding: 1vmin 0;
        position: absolute;
        text-shadow: 0 0 2px hsl(0, 0%, 10%);
        width: 100%;
    }

    .recruitment .soldier-types li.active {
        background-color: hsl(105, 75%, 93%);
    }

    .recruitment .soldier-types li.locked {
        background-image: url(../img/locked.svg);
    }

    .recruitment .soldier-types li:not(.active):hover {
        background-color: hsl(105, 75%, 93%);
    }

    .recruitment .soldier-types li:hover {
        border-color: hsl(105, 50%, 70%);
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
            <div class="illustration">
                <img
                    src={ `img/soldiers/${SOLDIERS[recruit].illus}.svg` }
                    alt={ SOLDIERS[recruit].name }
                />
            </div>
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
