<script>
    import { get } from 'svelte/store';

    import BUILDINGS from '../data/buildings';
    import SOLDIERS from '../data/soldiers';

    import army from '../stores/army';
    import food from '../stores/food';
    import resources from '../stores/resources';
    import villageMap from '../stores/villageMap';
    import worldMap from '../stores/worldMap';

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
    section {
        height: 100%;
    }
    ul {
        text-align: left;
    }
    li {
        display: inline;
        margin: 1vw;
    }
    .food {
        float: right;
    }
</style>

<section>
    <ul class="food">
        <li>
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
        </li>
    </ul>
    <ul>
        <li>
            { village.name }
        </li>
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
</section>
