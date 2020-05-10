<script>
    import gameOver from './stores/gameOver';
    import report from './stores/report';
    import screen from './stores/screen';

    import CombatReport from './panels/CombatReport.svelte';

    import Army from './screens/Army.svelte';
    import VillageMap from './screens/VillageMap.svelte';
    import WorldMap from './screens/WorldMap.svelte';
    import YouLost from './screens/YouLost.svelte';
    import YouWon from './screens/YouWon.svelte';

    import FightDetails from './tools/FightDetails.svelte';
    import Menu from './tools/Menu.svelte';
</script>

<style>
    main {
        display: grid;
        grid-template-rows: auto 1fr auto;
        height: 100%;
        text-align: center;
    }
</style>

{ #if $gameOver === gameOver.VICTORY }
    <YouWon />
{ :else if $gameOver === gameOver.DEFEAT }
    <YouLost />
{ :else }
    <main>
        <Menu />
        <CombatReport />

        { #if $screen === screen.WORLD }
            <WorldMap />
        { :else if $screen === screen.VILLAGE }
            <VillageMap />
        { :else if $screen === screen.ARMY }
            <Army />
        { /if }

        <FightDetails />
    </main>
{ /if }
