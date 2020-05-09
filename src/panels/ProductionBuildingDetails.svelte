<script>
    import BUILDINGS from '../data/buildings';

    import BuildingResources from '../tools/BuildingResources.svelte';


    export let tile;
    export let building;
</script>

{ #if tile.level > 0 }
<p>
    Production per turn: <BuildingResources resources={ building.output[tile.level] } />
    { #if tile.level < building.maxLevel }
    —
    Next level: <BuildingResources resources={ building.output[tile.level + 1] } />
    { /if }
</p>
{ /if }
