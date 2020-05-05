<script>
    import BUILDINGS from '../data/buildings';

    import BuildingResources from '../BuildingResources.svelte';

    export let tile;
    export let building;
</script>

{ #if tile.level > 0 }
<p>
    Production per turn: <BuildingResources resources={ building.output[tile.level] } />
</p>
{ /if }
{ #if tile.level < building.maxLevel }
<h3>Next Level ({ tile.level + 1 })</h3>
<p>
    Production per turn: <BuildingResources resources={ building.output[tile.level + 1] } />
</p>
<p>
    Construction cost: <BuildingResources resources={ building.cost[tile.level] } />
</p>
<p>
    Turns to completion: { tile.level + 1 }
</p>
{ /if }
