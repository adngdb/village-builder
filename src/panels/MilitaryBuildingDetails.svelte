<script>
    import BUILDINGS from '../data/buildings';
    import SOLDIERS from '../data/soldiers';

    import BuildingResources from '../BuildingResources.svelte';

    export let tile;
    export let building;
</script>

{ #if tile.level > 0 }
<table>
    <caption>Recruitment</caption>
    <thead>
        <tr>
            <td>Name</td>
            <td>Cost</td>
            <td>Turns</td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        { #each building.recruitment[tile.level] as recruit }
        <tr>
            <td>{ SOLDIERS[recruit].name }</td>
            <td><BuildingResources resources={ SOLDIERS[recruit].cost } /></td>
            <td>{ SOLDIERS[recruit].turnsToRecruit }</td>
            <td class="controls">
                <button>Recruit</button>
            </td>
        </tr>
        { /each }
    </tbody>
</table>
{ /if }
{ #if tile.level < building.maxLevel }
<h3>Next Level ({ tile.level + 1 })</h3>
<p>
    Construction cost: <BuildingResources resources={ building.cost[tile.level] } />
</p>
<p>
    Turns to completion: { tile.level + 1 }
</p>
{ /if }
