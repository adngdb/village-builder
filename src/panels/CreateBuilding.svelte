<script>
    import { createEventDispatcher } from 'svelte';

    import BUILDINGS from '../data/buildings';

    import worldMap from '../stores/worldMap';

    import BuildingResources from '../tools/BuildingResources.svelte';
    import BuildingRecruitment from '../tools/BuildingRecruitment.svelte';

    import Panel from './Panel.svelte';

    export let tileIndex;

    $: village = worldMap.getSelectedVillage().map;
    $: villageResources = worldMap.getSelectedVillage().resources;

    const dispatch = createEventDispatcher();

    function getBuildFn(building) {
        return () => {
            const cost = building.cost[0];
            if (villageResources.canPayCost(cost)) {
                villageResources.payCost(cost);
                village.createBuilding(tileIndex, building.type);
                dispatch('cancel');
            }
        };
    }

    function getBuildingData(type) {
        return {
            ...BUILDINGS[type],
            type,
            canPayCost: villageResources.canPayCost(BUILDINGS[type].cost[0]),
        };
    }

    const buildingTypes = Object.values(BUILDINGS.TYPES);
    function getBuildingsOfType(type, numberOfVillages) {
        return buildingTypes
        .filter(t => BUILDINGS[t].category === type)
        .filter(t => BUILDINGS[t].requiredVillageCount <= numberOfVillages)
        ;
    }

    $: villageCount = worldMap.getVillagesCount($worldMap);

    $: productionBuildings = getBuildingsOfType(
        BUILDINGS.CATEGORIES.PRODUCTION,
        villageCount,
    );
    $: militaryBuildings = getBuildingsOfType(
        BUILDINGS.CATEGORIES.MILITARY,
        villageCount,
    );

    $: production = productionBuildings.map(getBuildingData, $villageResources);
    $: military = militaryBuildings.map(getBuildingData, $villageResources);
</script>

<style>
    @media all and (max-width: 600px) {
        table td.name {
            display: none;
        }
    }
</style>

<Panel on:cancel>
    <span slot="title">Create a New Building</span>
    <table>
        <caption>
            Production Buildings
        </caption>
        <thead>
            <tr>
                <td></td>
                <td class="name">Name</td>
                <td>Cost</td>
                <td>Production per Turn</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            { #each production as building }
            <tr>
                <td>
                    <img
                        class="icon"
                        src={ `img/buildings/${building.illus}.svg` }
                        alt=""
                    />
                </td>
                <td class="name">{ building.name }</td>
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
                <td></td>
                <td class="name">Name</td>
                <td>Cost</td>
                <td>Recruits</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            { #each military as building }
            <tr>
                <td>
                    <img
                        class="icon"
                        src={ `img/buildings/${building.illus}.svg` }
                        alt=""
                    />
                </td>
                <td class="name">{ building.name }</td>
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
</Panel>
