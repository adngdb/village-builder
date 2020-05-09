<script>
    import worldMap from '../stores/worldMap';

    const selectedVillage = worldMap.selectedVillage;
    $: village = worldMap.getTile($selectedVillage);
    $: villages = worldMap.getHumanVillages($selectedVillage, $worldMap);

    function selectVillage(event) {
        worldMap.setSelectedVillageIndex(parseInt(event.target.value));
    }

    function selectPrevious() {
        let previous = villages.findIndex(v => v.index === $selectedVillage) - 1;
        if (previous < 0) {
            previous = villages.length - 1;
        }
        worldMap.setSelectedVillageIndex(villages[previous].index);
    }

    function selectNext() {
        let next = villages.findIndex(v => v.index === $selectedVillage) + 1;
        if (next > villages.length - 1) {
            next = 0;
        }
        worldMap.setSelectedVillageIndex(villages[next].index);
    }
</script>

<style>
</style>

<div>
    <button on:click={ selectPrevious }>←</button>
    <select
        value={ $selectedVillage }
        on:change={ selectVillage }
    >
        { #each villages as v }
        <option value={ v.index }>
            { v.name }
        </option>
        { /each }
    </select>
    <button on:click={ selectNext }>→</button>
</div>
