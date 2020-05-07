<script>
    import endTurn from './actions/endTurn';

    import SOLDIERS from './data/soldiers';

    import army from './stores/army';
    import attackCamp from './stores/attackCamp';
    import wave from './stores/wave';
    import worldMap from './stores/worldMap';

    $: attackingIn = $wave.turnsToNext;
    $: armyStrength = army.getStrength($army);
</script>

<style>
    section {
        height: 100%;
    }

    .menu {
        background-color: hsl(0, 0%, 90%);
        border: 0.1vmin solid hsl(0, 0%, 40%);
        border-bottom: none;
        border-radius: 1vmin 1vmin 0 0;
    	box-sizing: border-box;
        box-shadow: 0 0 1vmin hsl(0, 0%, 90%);
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        height: 100%;
        margin: auto;
        padding: 1vmin 2vmin;
    	width: 90vmin;
    }

    .my-army {
        background-image: url(../img/humans.svg);
        background-repeat: no-repeat;
        text-align: left;
    }

    .demons-army {
        background-image: url(../img/demons.svg);
        background-repeat: no-repeat;
        background-position: right;
        text-align: right;
    }

    .strength {
        font-size: 4rem;
        font-weight: bold;
        padding: 2vmin 4vmin;
        text-shadow: 0 0 0.5vmin hsl(0, 100%, 100%);
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
                <p class="strength">{ $worldMap.flat()[$attackCamp].strength }</p>
            { :else }
                <p class="strength">{ $wave.strength }</p>
            { /if }
        </div>
    </div>
</section>
