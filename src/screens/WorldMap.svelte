<script>
    import attackCamp from '../stores/attackCamp';
    import screen from '../stores/screen';
    import worldMap from '../stores/worldMap';

    import HexTile from '../tools/HexTile.svelte';

    function getSelectVillageFn(tile) {
        return () => {
            worldMap.setSelectedVillageIndex(tile.index);
            screen.goToVillage();
        };
    }

    function getAttackCampFn(tile) {
        return () => {
            if (!worldMap.isAdjacentToHumanVillage(tile.index)) {
                return;
            }

            if ($attackCamp === tile.index) {
                attackCamp.reset();
            }
            else {
                attackCamp.set(tile.index);
            }
        };
    }

    let currentTile = 0;
</script>

<style>
    .world-map {
        display: grid;
        height: 100%;
    }

    .world-map > div,
    span {
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
                    <HexTile
                        type={ "camp " + tile.type }
                        attacked={ $attackCamp === tile.index }
                        onTileClick={ getAttackCampFn(tile) }
                    >
                        <span>{ tile.strength }</span>
                    </HexTile>
                { :else }
                    <HexTile
                        type="village"
                        onTileClick={ getSelectVillageFn(tile) }
                    >
                        <span>{ tile.name }</span>
                    </HexTile>
                { /if }
            { /each }
        </div>
        { /each }
    </div>
</section>
