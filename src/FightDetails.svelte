<script>
	import endTurn from './actions/endTurn';

    import SOLDIERS from './data/soldiers';

    import army from './stores/army';
    import demons from './stores/demons';
    import turn from './stores/turn';

    $: attackingIn = demons.getNextAttackTurn() - $turn;
    $: armyStrength = Object.keys($army).reduce(
        (strength, type) => strength + ($army[type] * SOLDIERS[type].strength),
        0
    );
</script>

<style>
    section {
        position: absolute;
        bottom: 0;
    }
    .panel {
        background-color: #ddd;
        border: 0.1vmin solid #aaa;
        border-bottom: none;
        border-radius: 1vmin 1vmin 0 0;
        display: grid;
        grid-template-columns: 1fr 20vmin 1fr;
        padding: 1vmin 2vmin;
    }

    .my-army {
        text-align: left;
    }

    .demons-army {
        text-align: right;
    }

    .strength {
        font-size: 6vmin;
    }

    .next-turn button {
        border-radius: 100%;
        height: 10vmin;
        width: 10vmin;
    }
</style>

<section>
    <div class="panel">
        <div class="my-army">
            <h2>My Army</h2>
            <p class="strength">{ armyStrength }</p>
        </div>
        <div class="next-turn">
            <p>
                Next attack
                <strong>
                { #if attackingIn === 0 }
                this turn
                { :else if attackingIn === 1 }
                next turn
                { :else }
                in { attackingIn } turns
                { /if }
                </strong>
            </p>
            <button on:click={ endTurn }>End Turn</button>
        </div>
        <div class="demons-army">
            <h2>Demons Army</h2>
            <p class="strength">{ $demons }</p>
        </div>
    </div>
</section>
