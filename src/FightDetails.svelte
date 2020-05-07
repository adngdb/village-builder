<script>
    import endTurn from './actions/endTurn';

    import SOLDIERS from './data/soldiers';

    import army from './stores/army';
    import attackCamp from './stores/attackCamp';
    import demons from './stores/demons';
    import turn from './stores/turn';
    import worldMap from './stores/worldMap';

    $: attackingIn = demons.getNextAttackTurn() - $turn;
    $: armyStrength = army.getStrength($army);
</script>

<style>
    section {
        height: 100%;
    }
    .menu {
        background-color: #ddd;
        border: 0.1vmin solid #aaa;
        border-bottom: none;
        border-radius: 1vmin 1vmin 0 0;
    	box-sizing: border-box;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        height: 100%;
        margin: auto;
        padding: 1vmin 2vmin;
    	width: 90vmin;
    }

    .my-army {
        text-align: left;
    }

    .demons-army {
        text-align: right;
    }

    .strength {
        font-size: 6vmin;
        padding: 2vmin 0;
    }

    .next-turn {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        text-align: center;
    }

    .next-turn button {
        background: rgb(255, 186, 33);
        border: 0.4vmin solid rgb(196, 141, 0);
        border-radius: 100%;
        height: 10vh;
        margin: auto;
        width: 10vh;
    }
</style>

<section>
    <div class="menu">
        <div class="my-army">
            <h2>My Army</h2>
            <p class="strength">{ armyStrength }</p>
        </div>
        <div class="next-turn">
            <p>
                { #if $attackCamp !== null }
                    Attacking Camp at end of turn
                { :else }
                    Next wave
                    <strong>
                    { #if attackingIn === 0 }
                    this turn
                    { :else if attackingIn === 1 }
                    next turn
                    { :else }
                    in { attackingIn } turns
                    { /if }
                    </strong>
                { /if }
            </p>
            <button on:click={ endTurn }>
                { #if $attackCamp !== null }
                Attack Camp
                { :else }
                End Turn
                { /if }
            </button>
        </div>
        <div class="demons-army">
            { #if $attackCamp !== null }
                <h2>Demon Camp</h2>
                <p class="strength">{ $worldMap.flat()[$attackCamp].strength }</p>
            { :else }
                <h2>Next Demons Wave</h2>
                <p class="strength">{ $demons }</p>
            { /if }
        </div>
    </div>
</section>
