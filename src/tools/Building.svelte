<script>
    import BUILDINGS from '../data/buildings';

    import worldMap from '../stores/worldMap';


    export let tile;

    $: building = BUILDINGS[tile.building];

    const selectedVillage = worldMap.selectedVillage;
    $: villageResources = worldMap.getSelectedVillage($selectedVillage).resources;
</script>

<style>
    @keyframes can-upgrade {
        0%, 100% { height: 1em; }
        50% { height: 0.5em; }
    }

    .building {
        font-size: 0.8em;
    }

    .building .illustration {
        height: 2em;
        width: 2em;
    }

    .building .level span {
        font-size: 0.6em;
        margin: auto;
    }

    .building .level .can-upgrade {
        animation: can-upgrade 1000ms infinite;
    }

    .building .level span img {
        vertical-align: text-bottom;
    }

    .building .queue {
        font-size: 0.6em;
    }
</style>

<div class="building">
    <div>
        <img
        class="illustration"
        src={ `img/buildings/${building.illus}.svg` }
        alt="{ building.name }"
        />
    </div>
    <div class="level">
        <strong>{ tile.level }</strong>
        { #if tile.isBuilding }
        <span><img class="icon" src="img/upgrade.svg" alt="upgrade" />({ tile.turnsToCompletion }<img class="icon" alt="turns" src="img/turn.svg" />)</span>
        { :else if tile.level < building.maxLevel && villageResources.canPayCost(building.cost[tile.level]) }
        <span><img class="icon can-upgrade" src="img/upgrade.svg" alt="upgrade" /></span>
        { /if }
    </div>
    { #if building.category === BUILDINGS.CATEGORIES.MILITARY && tile.level }
    <div class="queue">
        <img class="icon" alt="queue" src="img/queue.svg" />
        { tile.queue.length }
    </div>
    { /if }
</div>
