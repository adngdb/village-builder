<script>
    import demons from './stores/demons';
    import turn from './stores/turn';

    $: attackingIn = demons.getNextAttackTurn() - $turn;
</script>

<style></style>

<div>
    Next Demon attack:
    <strong>
    { #if attackingIn === 0 }
    this turn
    { :else if attackingIn === 1 }
    next turn
    { :else }
    in { attackingIn } turns
    { /if }
    </strong>
    Strength: <strong>{ $demons }</strong>
</div>
