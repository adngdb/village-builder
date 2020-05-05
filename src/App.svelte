<script>
	import villageMap from './stores/villageMap';

	import BuildingDetails from './panels/BuildingDetails.svelte';
	import CreateBuilding from './panels/CreateBuilding.svelte';

	import FightDetails from './FightDetails.svelte';
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
		upgradingOnTile = null;
	}

	function onUpgradeBuilding(event) {
		buildingOnTile = null;
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
	<BuildingDetails
		tileIndex={ upgradingOnTile }
		on:cancel={ onCancel }
	/>
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
	<FightDetails />
</main>
