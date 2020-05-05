<script>
	import FightDetails from './FightDetails.svelte';
	import Resources from './Resources.svelte';
	import VillageMap from './VillageMap.svelte';

</script>

<style>
	main {
		display: grid;
		grid-template-rows: 5vh 1fr 15vh;
		height: 100%;
		text-align: center;
	}
</style>

<main>
	<Resources />
	<VillageMap />
	<FightDetails />
</main>
