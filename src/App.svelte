<script>
	import HexTile from './HexTile.svelte';
</script>

<style>
	main {
		text-align: center;
	}
</style>

<main>
	<div>
		<HexTile content="F1"></HexTile>
		<HexTile content="W2"></HexTile>
		<HexTile content="S3"></HexTile>
	</div>
	<div>
		<HexTile></HexTile>
		<HexTile></HexTile>
		<HexTile></HexTile>
	</div>
</main>
