<script>
	import screen from './stores/screen';
	import worldMap from './stores/worldMap';

	import HexTile from './HexTile.svelte';

    function getSelectVillageFn(tile) {
        return () => {
			worldMap.setSelectedVillageIndex(tile.index);
            screen.goToVillage();
        };
    }
</script>

<style>
    .world-map {
        display: grid;
        height: 100%;
    }

    .world-map > div {
        margin: auto;
    }
</style>

<section class="world-map">
    <div>
        { #each $worldMap as line }
        <div>
            { #each line as tile }
                { #if tile === worldMap.EMPTY_TILE }
                    <HexTile empty />
                { :else if tile.owner === worldMap.DEMONS }
                    <HexTile>{ tile.strength }</HexTile>
                { :else }
                    <HexTile
                        onTileClick={ getSelectVillageFn(tile) }
                    >H</HexTile>
                { /if }
            { /each }
        </div>
        { /each }
    </div>
</section>
