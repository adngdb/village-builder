<script>
    import { createEventDispatcher } from 'svelte';

    import BUILDINGS from '../data/buildings';

    import resources from '../stores/resources';
    import villageMap from '../stores/villageMap';

    import BuildingResources from '../BuildingResources.svelte';
    import BuildingRecruitment from '../BuildingRecruitment.svelte';

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

    const buildingTypes = Object.values(BUILDINGS.TYPES);
    const productionBuildings = buildingTypes.filter(
        t => BUILDINGS[t].category === BUILDINGS.CATEGORIES.PRODUCTION
    );
    const militaryBuildings = buildingTypes.filter(
        t => BUILDINGS[t].category === BUILDINGS.CATEGORIES.MILITARY
    );
</script>

<style>
    section {
        display: grid;
        height: 80vh;
        position: absolute;
        z-index: 200;
    }
</style>

<section>
    <div class="panel">
        <h2>
            <span on:click={ cancel } class="close">X</span>
            Create a New Building
        </h2>
        <table>
            <caption>
                Production Buildings
            </caption>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Cost</td>
                    <td>Production per Turn</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                { #each productionBuildings as building }
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
                    <td class="controls">
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
        <table>
            <caption>
                Military Buildings
            </caption>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Cost</td>
                    <td>Recruits</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                { #each militaryBuildings as building }
                <tr>
                    <td>{ BUILDINGS[building].name }</td>
                    <td>
                        <BuildingResources
                            resources={ BUILDINGS[building].cost[0] }
                        />
                    </td>
                    <td>
                        <BuildingRecruitment
                            recruitment={ BUILDINGS[building].recruitment }
                        />
                    </td>
                    <td class="controls">
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
        <p class="controls">
            <button on:click={ cancel }>Cancel</button>
        </p>
    </div>
</section>
