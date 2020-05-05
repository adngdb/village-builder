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
    .panel {
        background-color: #ddd;
        border: 0.1vmin solid #aaa;
        border-top: none;
        border-radius: 0 0 1vmin 1vmin;
        height: 100%;
        padding: 1vmin 0;
        margin-bottom: 2vmin;
    }
    li {
        display: inline;
        margin: 1vw;
    }
    img {
        height: 1em;
        width: 1em;
    }
</style>

<section>
    <ul class="panel">
        { #each resources.RESOURCES as res }
        <li>
            <img src={ `img/${res.key}.svg` } alt={ res.key } title={ res.name } />
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
