<script>
    import { get } from 'svelte/store';

    import BUILDINGS from '../data/buildings';
    import SOLDIERS from '../data/soldiers';

    import army from '../stores/army';
    import food from '../stores/food';
    import resources from '../stores/resources';
    import villageMap from '../stores/villageMap';
    import worldMap from '../stores/worldMap';

    import VillageSelector from './VillageSelector.svelte';

    const selectedVillage = worldMap.selectedVillage;
    $: village = worldMap.getTile($selectedVillage);
    $: map = worldMap.getSelectedVillage($selectedVillage).map;
    $: villageResources = worldMap.getSelectedVillage($selectedVillage).resources;

    function getResourcesProduction() {
        const prod = {};
        resources.RESOURCES.forEach(r => {
            prod[r.key] = 0;
        });

        // Buildings production
        $map.flat()
        .filter(t => t !== villageMap.EMPTY_TILE)
        .filter(t => t.building && t.level > 0)
        .filter(
            t => BUILDINGS[t.building].category === BUILDINGS.CATEGORIES.PRODUCTION
        )
        .forEach(tile => {
            const output = BUILDINGS[tile.building].output[tile.level];
            for (const resource in output) {
                prod[resource] += output[resource];
            }
        });

        return prod;
    }

    function getFoodProduction($army) {
        let prod = 0;
        worldMap.getHumanVillages().forEach(v => {
            get(v.map).flat()
            .filter(t => t !== villageMap.EMPTY_TILE)
            .filter(t => t.building && t.level > 0)
            .filter(
                t => BUILDINGS[t.building].category === BUILDINGS.CATEGORIES.PRODUCTION
            )
            .forEach(tile => {
                const output = BUILDINGS[tile.building].output[tile.level];
                if (output.food) {
                    prod += output.food;
                }
            });
        });

        // Army food consumption.
        const foodToEat = Object.keys($army).reduce(
            (food, type) => food + ($army[type] * SOLDIERS[type].foodIntake),
            0
        );
        prod -= foodToEat;

        return prod;
    }

    $: resourcesProd = getResourcesProduction($selectedVillage, $map);
    $: foodProd = getFoodProduction($army);
</script>

<style>
    .resources-panel {
        display: grid;
        grid-template-columns: auto 1fr auto;
        padding: 1vmin 0;
        position: relative;
        z-index: 200;
    }

    .resources-panel > div {
        margin: auto 2vmin;
    }

    .resources-panel > ul {
        margin: auto 2vmin;
        text-align: left;
    }

    .resources-panel > ul li {
        display: inline;
        margin: 0 1vw;
    }

    .resources-panel .food {
        text-align: right;
    }

    @media all and (max-width: 630px) {
        .resources-panel .resources {
            grid-row-start: 2;
            grid-column: 1 / 3;
            margin-top: 1vmin;
            width: 100%;
        }
    }
</style>

<section class="resources-panel">
    <div>
        <VillageSelector />
    </div>
    <ul class="resources">
        { #each resources.RESOURCES as res }
        <li>
            <img class="icon" src={ `img/${res.key}.svg` } alt={ res.key } title={ res.name } />
            <strong>{ $villageResources[res.key] }</strong>
            (
            { #if resourcesProd[res.key] === 0 }
                -
            { :else if resourcesProd[res.key] > 0 }
                +{ resourcesProd[res.key] }
            { :else }
                { resourcesProd[res.key] }
            { /if }
            )
        </li>
        { /each }
    </ul>
    <div class="food">
        <img class="icon" src="../img/world.svg" alt="global" />
        <img class="icon" src={ `img/food.svg` } alt="food" title="Food" />
        <strong>{ $food }</strong>
        (
        { #if foodProd === 0 }
            -
        { :else if foodProd > 0 }
            +{ foodProd }
        { :else }
            { foodProd }
        { /if }
        )
    </div>
</section>
