<script>
    import BUILDINGS from './data/buildings';
    import SOLDIERS from './data/soldiers';

    import army from './stores/army';
    import resources from './stores/resources';
    import villageMap from './stores/villageMap';

    function getResourcesProduction($army, $villageMap) {
        const prod = {};
        resources.RESOURCES.forEach(r => {
            prod[r.key] = 0;
        });

        // Buildings production
        $villageMap.flat()
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

        // Army food consumption.
        const foodToEat = Object.keys($army).reduce(
            (food, type) => food + ($army[type] * SOLDIERS[type].foodIntake),
            0
        );
        prod['food'] -= foodToEat;

        return prod;
    }

    $: resourcesProd = getResourcesProduction($army, $villageMap);
</script>

<style>
    section {
        height: 100%;
    }
    li {
        display: inline;
        margin: 1vw;
    }
</style>

<section>
    <ul class="menu">
        { #each resources.RESOURCES as res }
        <li>
            <img class="icon" src={ `img/${res.key}.svg` } alt={ res.key } title={ res.name } />
            <strong>{ $resources[res.key] }</strong>
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
