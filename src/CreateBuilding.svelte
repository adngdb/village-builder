<script>
    import { createEventDispatcher } from 'svelte';

    import BUILDINGS from './data/buildings';
    import resources from './stores/resources';
    import villageMap from './stores/villageMap';

    import BuildingResources from './BuildingResources.svelte';

    export let tileIndex;

    const dispatch = createEventDispatcher();

    function cancel() {
        dispatch('cancel');
    }

    function getBuildFn(building) {
        return () => {
            const cost = BUILDINGS[building].cost[0];
            if (resources.canPayCost(cost)) {
                resources.payCost(cost);
                villageMap.createBuilding(tileIndex, building);
                cancel();
            }
        };
    }
</script>

<style>
    section {
        position: absolute;
        width: 100%;
        z-index: 200;
    }

    .panel {
        background-color: white;
        border: 0.1vmin solid black;
        border-radius: 1vmin;
        box-sizing: border-box;
        width: 80vmin;
        margin: auto;
    }

    .panel h2 {
        border-bottom: 0.4vmin solid black;
        margin: 0;
        padding: 1vmin;
    }

    .panel table {
        margin: 2vmin 0;
        width: 100%;
    }

    .panel table thead {
        font-weight: bold;
    }

    button {
        cursor: pointer;
    }
</style>

<section>
    <div class="panel">
        <h2>Create a New Building</h2>
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Cost</td>
                    <td>Production per Turn</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                { #each Object.values(BUILDINGS.TYPES) as building }
                <tr>
                    <td>{ BUILDINGS[building].name }</td>
                    <td>
                        <BuildingResources
                            resources={ BUILDINGS[building].cost[0] }
                        />
                    </td>
                    <td>
                        <BuildingResources
                            resources={ BUILDINGS[building].output[1] }
                        />
                    </td>
                    <td>
                        <button
                            on:click={ getBuildFn(building) }
                            disabled={ !resources.canPayCost(BUILDINGS[building].cost[0]) }
                        >
                            Build
                        </button>
                    </td>
                </tr>
                { /each }
            </tbody>
        </table>
        <button on:click={ cancel }>Cancel</button>
    </div>
</section>
