<script>
	import gameOver from './stores/gameOver';

	import FightDetails from './FightDetails.svelte';
	import Resources from './Resources.svelte';
	import VillageMap from './VillageMap.svelte';
	import YouLost from './YouLost.svelte';
</script>

<style>
	main {
		display: grid;
		grid-template-rows: 5vh 1fr 15vh;
		height: 100%;
		text-align: center;
	}
</style>

{ #if $gameOver === gameOver.VICTORY }
{ :else if $gameOver === gameOver.DEFEAT }
	<YouLost />
{ :else }
<main>
	<Resources />
	<VillageMap />
	<FightDetails />
</main>
{ /if }
