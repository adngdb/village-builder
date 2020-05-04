<script>
	import HexTile from './HexTile.svelte';

	import villageMap from './stores/villageMap';
</script>

<style>
	main {
		text-align: center;
	}
</style>

<main>
	{ #each $villageMap as line }
	<div>
		{ #each line as tile }
			{ #if tile.content === villageMap.EMPTY_TILE }
			<HexTile empty></HexTile>
			{ :else }
			<HexTile data={ tile }></HexTile>
			{ /if }
		{ /each }
	</div>
	{ /each }
</main>
