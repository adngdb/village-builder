<script>
	import villageMap from './stores/villageMap';

	import endTurn from './actions/endTurn';

	import CreateBuilding from './CreateBuilding.svelte';
	import HexTile from './HexTile.svelte';
	import Resources from './Resources.svelte';

	let buildingOnTile = null;
	let upgradingOnTile = null;

	function onCancel() {
		buildingOnTile = null;
		upgradingOnTile = null;
	}

	function onCreateBuilding(event) {
		buildingOnTile = event.detail.tileIndex;
	}

	function onUpgradeBuilding(event) {
		upgradingOnTile = event.detail.tileIndex;
	}
</script>

<style>
	main {
		text-align: center;
	}
</style>

<main>
	<Resources />
	{ #if buildingOnTile !== null }
	<CreateBuilding
		tileIndex={ buildingOnTile }
		on:cancel={ onCancel }
	/>
	{ :else if upgradingOnTile !== null }
	{ /if }
	<section class="village-map">
	{ #each $villageMap as line }
	<div>
		{ #each line as tile }
			{ #if tile === villageMap.EMPTY_TILE }
			<HexTile empty></HexTile>
			{ :else }
			<HexTile
				data={ tile }
				on:create={ onCreateBuilding }
				on:upgrade={ onUpgradeBuilding }
			></HexTile>
			{ /if }
		{ /each }
	</div>
	{ /each }
	</section>
	<button on:click={ endTurn }>End Turn</button>
</main>
