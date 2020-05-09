<script>
    import { createEventDispatcher } from 'svelte';

    import BUILDINGS from '../data/buildings';

    import worldMap from '../stores/worldMap';

    import BuildingResources from '../tools/BuildingResources.svelte';
    import BuildingRecruitment from '../tools/BuildingRecruitment.svelte';

    export let tileIndex;

    $: village = worldMap.getSelectedVillage().map;
    $: villageResources = worldMap.getSelectedVillage().resources;

    const dispatch = createEventDispatcher();

    function cancel() {
        dispatch('cancel');
    }

    function getBuildFn(building) {
        return () => {
            const cost = building.cost[0];
            if (villageResources.canPayCost(cost)) {
                villageResources.payCost(cost);
                village.createBuilding(tileIndex, building.type);
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

    function getBuildingData(type) {
        return {
            ...BUILDINGS[type],
            type,
            canPayCost: villageResources.canPayCost(BUILDINGS[type].cost[0]),
        };
    }

    $: production = productionBuildings.map(getBuildingData, $villageResources);
    $: military = militaryBuildings.map(getBuildingData, $villageResources);
</script>

<style>
    section {
        display: grid;
        height: 100%;
        position: absolute;
        z-index: 200;
    }
</style>

<section>
    <div class="panel">
        <h2>
            <span on:click={ cancel } class="close">
                <img class="icon" src="img/ui/cancel.svg" alt="" />
            </span>
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
                { #each production as building }
                <tr>
                    <td>{ building.name }</td>
                    <td>
                        <BuildingResources
                            resources={ building.cost[0] }
                        />
                    </td>
                    <td>
                        <BuildingResources
                            resources={ building.output[1] }
                        />
                    </td>
                    <td class="controls">
                        <button
                            on:click={ getBuildFn(building) }
                            disabled={ !building.canPayCost }
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
                { #each military as building }
                <tr>
                    <td>{ building.name }</td>
                    <td>
                        <BuildingResources
                            resources={ building.cost[0] }
                        />
                    </td>
                    <td>
                        <BuildingRecruitment
                            recruitment={ building.recruitment }
                        />
                    </td>
                    <td class="controls">
                        <button
                            on:click={ getBuildFn(building) }
                            disabled={ !building.canPayCost }
                        >
                            Build
                        </button>
                    </td>
                </tr>
                { /each }
            </tbody>
        </table>
        <p class="controls">
            <button on:click={ cancel }>
                <img class="icon" src="img/ui/cancel.svg" alt="" />
                Cancel
            </button>
        </p>
    </div>
</section>
