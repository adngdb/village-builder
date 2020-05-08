<script>
    import BUILDINGS from '../data/buildings';

    import villageMap from '../stores/villageMap';
    import worldMap from '../stores/worldMap';

    import BuildingDetails from '../panels/BuildingDetails.svelte';
    import CreateBuilding from '../panels/CreateBuilding.svelte';

    import Building from '../tools/Building.svelte';
    import HexTile from '../tools/HexTile.svelte';

    let createBuildingOnTile = null;
    let viewBuildingOnTile = null;

    function onCancel() {
        createBuildingOnTile = null;
        viewBuildingOnTile = null;
    }

    function getCreateBuildingFn(tile) {
        return () => {
            createBuildingOnTile = tile.index;
            viewBuildingOnTile = null;
        }
    }

    function getBuildingDetailsFn(tile) {
        return () => {
            createBuildingOnTile = null;
            viewBuildingOnTile = tile.index;
        }
    }

    const selectedVillage = worldMap.selectedVillage;
    $: village = worldMap.getSelectedVillage($selectedVillage).map;
</script>

<style>
    .village-map {
        display: grid;
        height: 100%;
        position: relative;
    }

    .village-map > div {
        margin: auto;
    }
</style>

<section class="village-map">
    { #if createBuildingOnTile !== null }
    <CreateBuilding
        tileIndex={ createBuildingOnTile }
        on:cancel={ onCancel }
    />
    { :else if viewBuildingOnTile !== null }
    <BuildingDetails
        tileIndex={ viewBuildingOnTile }
        on:cancel={ onCancel }
    />
    { /if }
    <div>
        { #each $village as line }
        <div>
            { #each line as tile }
                { #if tile === villageMap.EMPTY_TILE }
                    <HexTile empty />
                { :else if tile.building }
                    <HexTile
                        onTileClick={ getBuildingDetailsFn(tile) }
                    >
                        <Building { tile } />
                    </HexTile>
                { :else }
                    <HexTile
                        onTileClick={ getCreateBuildingFn(tile) }
                    />
                { /if }
            { /each }
        </div>
        { /each }
    </div>
</section>
