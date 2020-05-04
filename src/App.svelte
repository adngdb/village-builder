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
			{ #if tile === villageMap.EMPTY }
			<HexTile empty></HexTile>
			{ :else }
			<HexTile content="{tile}"></HexTile>
			{ /if }
		{ /each }
	</div>
	{ /each }
</main>
