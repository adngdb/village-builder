<script>
    import resources from './stores/resources';
</script>

<style>
    ul {
        list-style: none;
    }
    li {
        display: inline;
        margin: 1vw;
    }
    img {
        height: 1em;
        width: 1em;
    }
</style>

<ul>
    { #each resources.RESOURCES as res }
    <li>
        { res.name }:
        <strong>{ $resources[res.key] }</strong>
        <img src={ `img/${res.key}.svg` } alt={ res.key } />
    </li>
    { /each }
</ul>
