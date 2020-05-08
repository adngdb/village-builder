<script>
    import SOLDIERS from '../data/soldiers';

    import army from '../stores/army';

    $: soldierTypes = Object.keys($army).reverse();
    $: armyStrength = army.getStrength($army);
    $: foodIntake = army.getFoodIntake($army);
</script>

<style>
    section {
        display: grid;
    }
    .stats {
        display: grid;
        grid-template-columns: 50% 50%;
        font-size: 3rem;
        margin: 2vmin;
        text-align: center;
    }
    td {
        padding: 1vmin 0;
    }
</style>

<section>
    <div class="panel">
        <h2>Your army</h2>
        <div class="stats">
            <span>
                <strong>{ armyStrength }</strong>
                <img class="icon" src="img/strength.svg" alt="strength" />
            </span>
            <span>
                <strong>{ foodIntake }</strong>
                <img class="icon" src="img/food.svg" alt="food" />
            </span>
        </div>
        <table>
            <caption>Composition</caption>
            { #each soldierTypes as soldier }
            <tr>
                <td>{ $army[soldier] }</td>
                <td>{ SOLDIERS[soldier].name }</td>
                <td>
                    { SOLDIERS[soldier].strength }
                    <img class="icon" src="img/strength.svg" alt="strength" />
                </td>
                <td>
                    { SOLDIERS[soldier].foodIntake }
                    <img class="icon" src="img/food.svg" alt="food" />
                </td>
            </tr>
            { /each }
        </table>
    </div>
</section>
