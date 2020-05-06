<script>
    import BUILDINGS from './data/buildings';

    import villageMap from './stores/villageMap';

    import BuildingDetails from './panels/BuildingDetails.svelte';
    import CreateBuilding from './panels/CreateBuilding.svelte';

    import HexTile from './HexTile.svelte';

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
</script>

<style>
    .village-map {
        display: grid;
        height: 100%;
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
        { #each $villageMap as line }
        <div>
            { #each line as tile }
                { #if tile === villageMap.EMPTY_TILE }
                    <HexTile empty />
                { :else if tile.building }
                    <HexTile
                        onTileClick={ getBuildingDetailsFn(tile) }
                    >
                        <span>{ BUILDINGS[tile.building].name } { tile.level }</span>
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
