<script>
    export let resources;
</script>

<style>
    ul, li {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    img {
        height: 1em;
        width: 1em;
    }
</style>

<ul>
    { #each Object.entries(resources) as res }
    <li>{ res[1] } <img src={ `img/${res[0]}.svg` } alt={ res[0] } /></li>
    { /each }
</ul>
