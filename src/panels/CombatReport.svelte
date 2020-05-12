<script>
    import { createEventDispatcher } from 'svelte';

    import SOLDIERS from '../data/soldiers';

    import report from '../stores/report';
    import worldMap from '../stores/worldMap';

    import Panel from './Panel.svelte';

    let losses;
    $: if ($report && $report.losses && Object.keys($report.losses).length) {
        const types = Object.keys($report.losses);
        losses = types.map((type, i) => {
            let content = `${$report.losses[type]} ${SOLDIERS[type].name}`;
            if (i === types.length - 2) {
                content += ' and ';
            }
            else if (i < types.length - 2) {
                content += ', ';
            }
            return content;
        }).join('');
    }
</script>

{ #if $report }
<Panel on:cancel={ () => report.reset() }>
    <span slot="title">
        { #if !$report.losses }
        Blazing Victory!
        { :else }
        Victory!
        { /if }
    </span>

    { #if $report.type === 'wave' }
    <p>
        A wave of filthy demons attacked us, but our army stood its ground and repelled the demons.
    </p>
    { :else if $report.type === 'camp' }
    <p>Our army fought bravely and destroyed a demon camp!</p>
    { /if }

    { #if $report.losses }
    <p>
        However, we lost some soldiers during the fight.
        { losses } lost their lives in combat today.
    </p>
    { :else }
    <p>
        We took no losses during the fight. A miracle!
    </p>
    { /if }
</Panel>
{ /if }
