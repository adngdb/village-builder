<script>
	import villageMap from './stores/villageMap';

	import endTurn from './actions/endTurn';

	import HexTile from './HexTile.svelte';
	import Resources from './Resources.svelte';
</script>

<style>
	main {
		text-align: center;
	}
</style>

<main>
	<Resources />
	{ #each $villageMap as line }
	<div>
		{ #each line as tile }
			{ #if tile === villageMap.EMPTY_TILE }
			<HexTile empty></HexTile>
			{ :else }
			<HexTile data={ tile }></HexTile>
			{ /if }
		{ /each }
	</div>
	{ /each }
	<button on:click={ endTurn }>End Turn</button>
</main>
