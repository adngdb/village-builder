<script>
    import SOLDIERS from './data/soldiers';

    export let recruitment;
</script>

<style>
    ul, li {
        display: inline;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    li {
        margin: 0 0.2em;
    }
    img {
        height: 1em;
        width: 1em;
    }
</style>

<ul>
    { #each Object.entries(recruitment) as unit }
    <li>{ SOLDIERS[unit[0]].name }&nbsp;(lvl { unit[1] })</li>
    { /each }
</ul>
